## Azure Cosmos DB Developer Specialty Notes

NOTE: Use CosmicWorks to generate example Employee, Product, and Category data for sample applications: https://www.nuget.org/packages/cosmicworks 
Common CosmosDb Response codes: https://learn.microsoft.com/en-us/training/modules/monitor-responses-events-azure-cosmos-db-sql-api/2-review-common-response-codes


## NoSQL Dev Considerations
- Data Modeling (Schema) and Partitioning Strategy
- Replication Strategy
- Consistency Strategy
- Indexing Strategy for Required/Excluded paths depending on Queries, Reads and writes
- Query Optimization to Reduce RU's
    - Use QueryRequestOptions: PopulateIndexMetrics to see query efficiency data
    - Use response.RequestCharge to see RU's for each transaction cost by item
    - Use Composite Indexes to optimize queries with multiple properties and/or sorting
- Cache results for frequent or resource heavy queries
- Use Azure Monitor for metrics and telemetry data or CosmosDb API SDK for programmatic monitoring
    - 429 Status Code - Request rate exceeds provisioned RU/s - OK if 1-5% of requests with low latency
- Use alerts for
    - When the keys of an Azure Cosmos account are updated.
    - When the data or index usage of a container, database, or region exceeds a certain number of bytes.
    - When the normalized RU/s consumption is greater than a certain percentage.
    - When a region is added, removed, or goes offline.
    - When a database or a container is created, deleted, or updated.
    - When the throughput of your database or container is changed.
- Backups 
    - Periodic defaults to 4 hour intervals with 2 retained - cannot self restore
    - Continuous defaults to 30 day retention
- Security
    - Network-level access (firewall)
    - RBAC with/without Entra ID
    - Encryption - use of Customer managed keys that wrap Data Encryption Keys



## Data Modeling (Schema) and Partitioning Strategy
### Embed in the same document when:
- Read or updated together: Data that's read or updated together is nearly always modeled as a single document. This reduces the number of requests which is our objective in being efficient. In our scenario, all of the customer entities are read or written together.
- 1:1 relationship: For example, Customer and CustomerPassword have a 1:1 relationship.
- 1:Few relationship: In a NoSQL database, it's necessary to distinguish 1:Many relationships as bounded or unbounded. Customer and CustomerAddress have a bounded 1:Many relationship because customers in an e-commerce application normally have only a handful of addresses to ship to. When the relationship is bounded, this is a 1:Few relationship.

### Reference data as separate documents when:
- Read or updated independently: This is especially true where combining entities that would result in large documents. Updates in Azure Cosmos DB require the entire item to be replaced. If a document has a few properties that are frequently updated alongside a large number of mostly static properties, it's much more efficient to split the document into two. One document then contains the smaller set of properties that are updated frequently. The other document contains the static, unchanging values.
- 1:Many relationship: This is especially true if the relationship is unbounded. If you have a document which increases in size an unknown or unlimited amount of times, the cost and latency for those updates will keep increasing. This is due to the increasing size of the update costing more RU/s and the payloads going over the network which itself, is also inefficient.
- Many:Many relationship: We'll explore an example of this relationship in a later unit with product tags.
- Separating these properties reduces throughput consumption for more efficiency. It also reduces latency for better performance.

## CosmosDb Consistency Sliding Scale:
- **Strong** - Linear consistency. Data is replicated and committed in all configured regions before acknowledged as committed and visible to all clients.
- **Bounded Staleness** - Reads lag behind writes by a configured threshold in time or items.
- **Session** - Within a specific session (SDK instance), users can read their own writes.
- **Consistent Prefix** - Reads may lag behind writes, but reads will never appear out of order.
- **Eventual** - Reads will eventually be consistent with writes.


CREATE ONE: 
``` C#
    // Basic Create
    await container.CreateItemAsync<Product>(saddle);

    // OR Get and error handle responses
    try
    {
        // store the results in response
        ItemResponse<Product> response = await container.CreateItemAsync<Product>(saddle);

        // get elements from the results
        HttpStatusCode status = response.StatusCode;
        double requestUnits = response.RequestCharge;

        Product item = response.Resource;
    }
    catch(CosmosException ex) when (ex.StatusCode == HttpStatusCode.Conflict)
    {
        // Add logic to handle conflicting codes (see documentation)
    }
    catch(CosmosException ex) 
    {
        // Add general exception handling logic
    }
``` 

CREATE MULTIPLE (based on PartitionKey)
``` C#
    // Product items
    Product saddle = new("0120", "Worn Saddle", "9603ca6c-9e28-4a02-9194-51cdb7fea816");
    Product handlebar = new("012A", "Rusty Handlebar", "9603ca6c-9e28-4a02-9194-51cdb7fea816");

    PartitionKey partitionKey = new ("9603ca6c-9e28-4a02-9194-51cdb7fea816");

    TransactionalBatch batch = container.CreateTransactionalBatch(partitionKey)
        .CreateItem<Product>(saddle)
        .CreateItem<Product>(handlebar);
    
    using TransactionalBatchResponse response = await batch.ExecuteAsync();

    // Getting individual results
    TransactionalBatchOperationResult<Product> result0 = response.GetOperationResultAtIndex<Product>(0);
    TransactionalBatchOperationResult<Product> result1 = response.GetOperationResultAtIndex<Product>(1);
    Console.WriteLine($"Status:\t{result0.StatusCode}, {result1.StatusCode}");
```

READ:
``` C#
    // convert string uuid to PartitionKey
    string categoryId = "26C74104-40BC-4541-8EF5-9892F7F03D72";
    PartitionKey partitionKey = new (categoryId);
    Product saddle = await container.ReadItemAsync<Product>(id, partitionKey);
```

UPDATE:
``` C#
    // after obtaining the saddle object above
    saddle.price = 35.00d;
    saddle.tags = new string[] { "brown", "new", "crisp" };
    await container.ReplaceItemAsync<Product>(saddle);
```

UPDATE with optimistic concurrency control
``` C#
    string categoryId = "9603ca6c-9e28-4a02-9194-51cdb7fea816";
    PartitionKey partitionKey = new (categoryId);

    ItemResponse<Product> response = await container.ReadItemAsync<Product>("01AC0", partitionKey);
    Product product = response.Resource;
    string eTag = response.ETag;

    product.price = 50d;

    // CHECKING TO SEE IF THE eTag IS CURRENT OR HAS BEEN MODIFIED SINCE PRODUCT READ
    ItemRequestOptions options = new ItemRequestOptions { IfMatchEtag = eTag };
    await container.UpsertItemAsync<Product>(product, partitionKey, requestOptions: options);
```

TTL for a specific document (will auto-delete after expiration)
``` C#
    // model
    [JsonProperty(PropertyName = "ttl", NullValueHandling = NullValueHandling.Ignore)]
    public int? ttl { get; set; }
    // set
    saddle.ttl = 1000;
    // update
    await container.ReplaceItemAsync<Product>(saddle);
```

DELETE:
``` C#
    // Get the PartitionKey (in this instance, using categoryId)
    string id = "027D0B9A-F9D9-4C96-8213-C8546C4AAE71";
    string categoryId = "26C74104-40BC-4541-8EF5-9892F7F03D72";
    PartitionKey partitionKey = new (categoryId);
    // Delete with PartitionKey
    await container.DeleteItemAsync<Product>(id, partitionKey);

    // Or delete all entries with a categoryId
    await container.DeleteAllItemsByPartitionKeyStreamAsync<(partitionKey);
```

QUERIES, PRAMS, PAGINATION, AND ITERATION
``` C#
    // SQL syntax
    string sql = "SELECT p.name, t.name AS tag FROM products p JOIN t IN p.tags WHERE p.price >= @lower AND p.price <= @upper"
    
    // Query Prams
    QueryDefinition query = new (sql)
        .WithParameter("@lower", 500)
        .WithParameter("@upper", 1000);
    QueryDefinition query = new (sql);

    // Pagination
    QueryRequestOptions options = new ();
    options.MaxItemCount = 50;

    // NoSQL Call
    FeedIterator<Product> iterator = container.GetItemQueryIterator<Product>(query, requestOptions: options);

    // Iterate Results
    while (iterator.HasMoreResults)
    {
        FeedResponse<Product> products = await iterator.ReadNextAsync();
        foreach (Product product in products)
        {
            Console.WriteLine($"[{product.id}]\t[{product.name,40}]\t[{product.price,10}]");
        }

        Console.WriteLine("Press any key for next page of results");
        Console.ReadKey();        
    }

```

MODIFYING THE INDEXING STRATEGY FOR A CONTAINER
``` C#
    // Create IndexingPolicy
    IndexingPolicy policy = new ()
    {
        IndexingMode = IndexingMode.Consistent,
        Automatic = true
    };

    // Excluded Paths
    policy.ExcludedPaths.Add(
        new ExcludedPath{ Path = "/*" }
    );

    // Included Paths
    policy.IncludedPaths.Add(
        new IncludedPath{ Path = "/name/?" }
    );
    policy.IncludedPaths.Add(
        new IncludedPath{ Path = "/categoryName/?" }
    );

    // Configure Container Properties including IndexingPolicy
    ContainerProperties options = new ()
    {
        Id = "products",
        PartitionKeyPath = "/categoryId",
        IndexingPolicy = policy
    };

    // Create the container
    Container container = await database.CreateContainerIfNotExistsAsync(options, throughput: 400);
```

## Indexing Strategy
``` C#
    // Example indexing policy
    {
    // Indexing Mode: Consistent or None
    "indexingMode": "consistent",
    // Configures whether automatically indexes items as they are written
    "automatic": true,
    // Included Paths
    "includedPaths": [
        {
        "path": "/name/?"
        },
        {
        "path": "/categoryName/?"
        }
    ],
    // Excluded Paths
    "excludedPaths": [
        {
        "path": "/*"
        },
        {
        // _etag is a system generated entity tag used for optimistic concurrency control
        "path": "/\"_etag\"/?"
        }
    ],
    // use composite indexes to optimize queries with multiple properties and/or sorting
     "compositeIndexes": [
     [
       {
         "path": "/categoryName",
         "order": "descending"
       },
       {
         "path": "/price",
         "order": "ascending"
       }
     ],
     [
       {
         "path": "/categoryName",
         "order": "descending"
       },
       {
         "path": "/name",
         "order": "ascending"
       },
       {
         "path": "/price",
         "order": "ascending"
       }
     ]
     ]
    }
```

## Example Error handling based on common status code returns
``` C#
    try
    {
        await CompleteTaskOnCosmosDB(consoleinputcharacter, CustomersDB_Customer_container);
    }
    catch (CosmosException e)
    {
        switch (e.StatusCode.ToString())
        {
            case ("Conflict"):
                Console.WriteLine("Insert Failed. Response Code (409).");
                Console.WriteLine("Can not insert a duplicate partition key, customer with the same ID already exists."); 
                break;
            case ("Forbidden"):
                Console.WriteLine("Response Code (403).");
                Console.WriteLine("The request was forbidden to complete. Some possible reasons for this exception are:");
                Console.WriteLine("Firewall blocking requests.");
                Console.WriteLine("Partition key exceeding storage.");
                Console.WriteLine("Non-data operations are not allowed.");
                break;
            case ("TooManyRequests"):
            case ("ServiceUnavailable"):
            case ("RequestTimeout"):
                // Check if the issues are related to connectivity and if so, wait 10 seconds to retry.
                await Task.Delay(10000); // Wait 10 seconds
                try
                {
                    Console.WriteLine("Try one more time...");
                    await CompleteTaskOnCosmosDB(consoleinputcharacter, CustomersDB_Customer_container);
                }
                catch (CosmosException e2)
                {
                    Console.WriteLine("Insert Failed. " + e2.Message);
                    Console.WriteLine("Can not insert a duplicate partition key, Connectivity issues encountered.");
                    break;
                }
                break;    
            case ("NotFound"):
                Console.WriteLine("Delete Failed. Response Code (404).");
                Console.WriteLine("Can not delete customer, customer not found.");
                break; 
            default:
                Console.WriteLine(e.Message);
                break;
        }
    }
```

## DevOps Programmatic Management
- See documentation for examples and current code blocks
- Use Azure Resource Management 