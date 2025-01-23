## Azure Cosmos DB Developer Specialty Notes

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