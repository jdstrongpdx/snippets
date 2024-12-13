# Basic .NET Security

## .NET Security
- Deserialization Attacks: Untrusted data in the deserialization process can allow malicious code execution, putting the entire application at risk. Attackers may exploit vulnerabilities by sending unexpected data types or harmful code, potentially gaining unauthorized access or control.

- Data Tampering: Serialized data can be intercepted and altered if transmitted over unsecured channels, compromising data integrity. This tampering might result in altered records, unauthorized transactions, or other security breaches.

- Exposure of Sensitive Information: Confidential data, such as user passwords or identifiers, can be accidentally exposed when included in serialized objects and shared or stored insecurely. Without proper handling, attackers can exploit serialized data to access sensitive information.

## Security Best Practices
- Validate and Sanitize Inputs: Ensuring incoming data is validated and sanitized before deserialization reduces the risk of data corruption or harmful code execution.

- Use Secure Serialization Libraries: Rely on libraries with built-in security features and keep them updated to minimize exposure to known vulnerabilities.

- Avoid Deserializing Untrusted Data: Only deserialize data from verified, trusted sources, as untrusted sources may contain harmful elements designed to exploit application vulnerabilities.

- Implement Access Controls: Limit access to serialized data through role-based access control (RBAC), ensuring only authorized users can access or modify sensitive data.

- Encrypt Sensitive Data and Perform Integrity Checks: Encrypt data before serialization to prevent unauthorized access. Data integrity checks, such as hashing or digital signatures, help confirm that data remains unaltered during transmission.


``` c#
using System;
using System.Text.Json;
using System.Security.Cryptography;
using System.Text;

public class User
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public void EncryptData()
    {
        Password = Convert.ToBase64String(Encoding.UTF8.GetBytes(Password));
    }

    public string GenerateHash()
    {
        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(ToString()));
            return Convert.ToBase64String(hashBytes);
        }
    }

    public override string ToString() => JsonSerializer.Serialize(this);
}

public class Program
{
    public static void Main()
    {
        User user = new User { Name = "Alice", Email = "alice@example.com", Password = "SecureP@ss123" };

        // Step 2: Serialization risks
        string serializedData = SerializeUserData(user);
        Console.WriteLine("Serialized Data:\n" + serializedData);

        // Step 3: Input validation

        // Step 5: Deserialize only from trusted sources
        string trustedSourceData = serializedData; // Assume this is from a trusted source
        User deserializedUser = DeserializeUserData(trustedSourceData, isTrustedSource: true);

        if (deserializedUser != null)
        {
            Console.WriteLine("Deserialization successful for trusted source.");
        }
    }

    public static string SerializeUserData(User user)
    {
        user.EncryptData();
        return JsonSerializer.Serialize(user);
    }

    public static User DeserializeUserData(string jsonData, bool isTrustedSource)
    {
        if (!isTrustedSource)
        {
            Console.WriteLine("Deserialization blocked: Untrusted source.");
            return null;
        }
        return JsonSerializer.Deserialize<User>(jsonData);
    }
}
```