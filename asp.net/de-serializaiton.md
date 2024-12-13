# Serialization & Deserialization in .NET

## JSON Serialization
``` c#
using System;
using System.IO;
using System.Text.Json;

public class Person
{
    public string UserName { get; set; }
    public int UserAge { get; set; }
}

class Program
{
    static void Main()
    {
        Person samplePerson = new Person { UserName = "Alice", UserAge = 30 };
        string jsonString = JsonSerializer.Serialize(samplePerson);

        File.WriteAllText("person.json", jsonString);

        Console.WriteLine("JSON serialization complete.");
    }
}
```

## JSON Deserialization
``` c#
using System;
using System.Text.Json;

public class Person
{
    public string UserName { get; set; }
    public int UserAge { get; set; }
}

public class Program
{
    public static void Main()
    {
        var jsonData = "{\"UserName\": \"Charlie\", \"UserAge\": 45}";
        var deserializedPerson = JsonSerializer.Deserialize<Person>(jsonData);
        
        Console.WriteLine($"JSON Deserialization - UserName: {deserializedPerson.UserName}, UserAge: {deserializedPerson.UserAge}");
    }
}
```

## Binary Serialization & Deserialization
``` c#
using System;
using System.IO;

public class Person
{
    public string UserName { get; set; }
    public int UserAge { get; set; }
}

public class Program
{
    public static void Main()
    {
        // Serialize example for testing
        var samplePerson = new Person { UserName = "Alice", UserAge = 30 };
        
        // Binary serialization
        using (var fs = new FileStream("person.dat", FileMode.Create))
        using (var writer = new BinaryWriter(fs))
        {
            writer.Write(samplePerson.UserName);
            writer.Write(samplePerson.UserAge);
        }
        Console.WriteLine("Binary serialization complete.");

        // Binary deserialization
        Person deserializedPerson;
        using (var fs = new FileStream("person.dat", FileMode.Open))
        using (var reader = new BinaryReader(fs))
        {
            deserializedPerson = new Person
            {
                UserName = reader.ReadString(),
                UserAge = reader.ReadInt32()
            };
        }

        Console.WriteLine($"Binary Deserialization - UserName: {deserializedPerson.UserName}, UserAge: {deserializedPerson.UserAge}");
    }
}
```   

## XML Serialization
``` c#
using System;
using System.IO;
using System.Xml.Serialization;

public class Person
{
    public string UserName { get; set; }
    public int UserAge { get; set; }
}

class Program
{
    static void Main()
    {
        Person samplePerson = new Person { UserName = "Alice", UserAge = 30 };
        XmlSerializer xmlSerializer = new XmlSerializer(typeof(Person));

        using (StreamWriter writer = new StreamWriter("person.xml"))
        {
            xmlSerializer.Serialize(writer, samplePerson);
        }

        Console.WriteLine("XML serialization complete.");
    }
}
```

## XML Deserialization
``` c#
using System;
using System.IO;
using System.Xml.Serialization;

public class Person
{
    public string UserName { get; set; }
    public int UserAge { get; set; }
}

public class Program
{
    public static void Main()
    {
        var xmlData = "<Person><UserName>Bob</UserName><UserAge>30</UserAge></Person>";
        var serializer = new XmlSerializer(typeof(Person));

        using (var reader = new StringReader(xmlData))
        {
            var deserializedPerson = (Person)serializer.Deserialize(reader);
            Console.WriteLine($"XML Deserialization - UserName: {deserializedPerson.UserName}, UserAge: {deserializedPerson.UserAge}");
        }
    }
}
```
