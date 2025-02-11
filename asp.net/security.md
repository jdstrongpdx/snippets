# Basic .NET Security

## Security Fundamentals
- Access
    - Use Scopes, RBAC, and Claims to limit user access based on the Least Privilege Principle
    - Implement secure Auth handling
        - Limit token TTL times
        - Limit access to refresh tokens with HttpOnly cookies
    - Use Data Masking and Obfuscation to replace/hide sensitive data during development or to limit access
    - Test and Audit access regularly
- Data at Rest
    - Encrypt data at rest
    - Use compliance features to ensure correct implementations and handling
    - Redundant data storage
- Data in Transit
    - Use TLS, HTTPS to encrypt and secure data in transit between the application and the user
    - Use VPN for development and communication work between employees
- Coding
    - Keys
        - Securely store keys and limit access to them
        - Rotate Keys on a regular interval
        - Use strong and random key generators
    - Perform input Validation
        - Prevents SQL injection
        - Prevents Cross-Site Scripting (XSS) Attacks - attackers inject malicious scripts into web pages which are executed in users' browsers - Can steal data, hijack user sessions, or perform unauthorized actions
    - Secure coding standards
        - OWASP Top 10
        - Use trusted libraries (like bcrypt for passwords)
        - Regular code reviews and automated testing 
        - Penetration testing 

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

## Data Protection
- Confidentiality - limit access to sensitive information, ensuring that only authorized individuals or systems can view or handle it 
- Integrity - data remains accurate, consistent, and unaltered throughout its lifecycle (can't be tampered)
- Availability - ensuring systems, data, and resources are accessible to authorized users whenever needed.

## Data Protection Threats
- Confidentiality => Unauthorized access
- Integrity => Data corruption or alteration
- Availability => DoS (Denial of Service) or DDoS attack (multiple sources) - overwhelm with fake requests

## Encryption
- Converts plaintext into ciphertext
- Symmetric - same key is used to encrypt/decrypt data
- Asymmetric encryption - one key for encryption (public) and one for decryption (private)
- AES (Advanced Encryption Standard) - fast, secure, widely used symmetric encryption algorithm
- RSA - popular asymmetric encryption algorithm (SSL/TLS certificate signing)

## Implementing Symmetric Encryption (AES)
1. Select an Algorithm: Use AES (Advanced Encryption Standard) for secure and efficient symmetric encryption.
2. Generate a Key: Create a strong, random key for encryption (e.g., 256-bit key).
3. Initialize the Cipher: Set up the encryption cipher with the key and an Initialization Vector (IV).
4. Encrypt Data:
    - Convert the plain text to bytes.
    - Use the cipher to encrypt the data, producing ciphertext.
    - Store Securely: Store the encryption key securely, ensuring only authorized users can access it.

## Implementing Asymmetric Encryption (RSA)
1. Generate Key Pair: Create a public and private key pair (e.g., 2048-bit RSA).
2. Distribute Public Key: Share the public key with users or applications that need to encrypt data for you.
3. Encrypt Data:
    - Use the public key to encrypt the data.
4. Decrypt Data:
    - Use the private key to decrypt the data and recover the original plain text.
5. Key Management: Protect the private key with strong access controls and store it securely.

## Testing Encryption and Decryption
- Encrypt Sample Data: Create and encrypt a sample piece of data using your chosen method.
- Decrypt to Validate: Decrypt the data to ensure it matches the original plain text.
- Check Integrity: Verify that the data remains unchanged during the encryption/decryption.

## Best Practices for Key Management
- Key Rotation: Regularly update and rotate encryption keys.
- Secure Storage: Store keys in a secure environment like a Hardware Security Module (HSM).
- Access Control: Limit access to encryption keys to authorized personnel only.
- Backup Keys: Maintain encrypted backups of keys for recovery purposes.
- Use Strong Keys: Ensure keys are sufficiently complex (e.g., 256-bit for AES, 2048-bit for RSA).

## Data Security Best Practices
- Use Encryption in Transit: Encrypt data transmitted over networks using protocols like TLS.
- Encrypt Data at Rest: Protect stored data using AES encryption.
- Avoid Hardcoding Keys: Do not embed encryption keys in code or configuration files.
- Audit and Monitor: Regularly review encryption implementations and monitor for potential breaches.

## Data Masking
- The process of altering specific data elements, often replacing sensitive information with fictional data
- Static data masking - copy an object and replace the values with fake ones while retaining the structure
- Dynamic data masking - hides information in real-time without altering the original data (not displaying credit card digits except the last four)
- Personal data masking - emails, phone numbers, credit cards, etc.
- Social security masking - only displaying the last four digits for confirmation, while hiding the rest

## Data Obfuscation
- deliberate process of making data difficult to interpret, even if someone gets access to it
- tokenization - replaces sensitive data with symbols or tokens (credit card numbers)
- data scrambling - format and structure are preserved 
- code obfuscation - modifies software code to make it difficult to understand while retaining code (prevents reverse engineering)

## Masking vs Obfuscation Key Points
- Masking: replaces data with realistic fakes
- Obfuscation: transforms real data into an unreadable format

## Data Storage Security Best Practices
1. Encryption of Data at Rest
2. Access Control
3. Redundancy

## Data in Transit Best Practices - TLS, VPN
1. Transport Layer Security - TLS - data encryption over the internet
2. Secure Socket Layer - SSL - outdated due to security concerns - replaced by TLS
3. VPN - secure encrypted tunnel between devices, hides IP addresses, access to geo spoofing 
4. Network protections
    - Firewalls
    - Intrusion Detection System (IDS)

``` c#
    // Basic SHA based encryption/decryption 
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

``` C#
    // AES Encryption/Decryption Service

    // DataStorage.cs
    using System;
    using System.Security.Cryptography;
    using System.Text;

    namespace SecureDataApp
    {
        public class SecureStorage
        {
            private string _encryptedData;

            public void StoreData(string data, byte[] key, byte[] iv)
            {
                _encryptedData = Convert.ToBase64String(Encrypt(data, key, iv));
            }

            public string RetrieveData(User user, byte[] key, byte[] iv)
            {
                if (user.Role != "Admin")
                    throw new UnauthorizedAccessException("Access denied. Admin role required.");

                return Decrypt(Convert.FromBase64String(_encryptedData), key, iv);
            }

            private static byte[] Encrypt(string data, byte[] key, byte[] iv)
            {
                using (Aes aes = Aes.Create())
                {
                    aes.Key = key;
                    aes.IV = iv;
                    ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                    using (var ms = new System.IO.MemoryStream())
                    using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                    {
                        using (var writer = new System.IO.StreamWriter(cs))
                        {
                            writer.Write(data);
                        }
                        return ms.ToArray();
                    }
                }
            }

            private static string Decrypt(byte[] data, byte[] key, byte[] iv)
            {
                using (Aes aes = Aes.Create())
                {
                    aes.Key = key;
                    aes.IV = iv;
                    ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                    using (var ms = new System.IO.MemoryStream(data))
                    using (var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                    using (var reader = new System.IO.StreamReader(cs))
                    {
                        return reader.ReadToEnd();
                    }
                }
            }
        }
    }

    // User.cs
    namespace SecureDataApp
    {
        public class User
        {
            public string Username { get; set; }
            public string Role { get; set; }
        }
    }

    // Program.cs
    using System;

    namespace SecureDataApp
    {
        class Program
        {
            static void Main(string[] args)
            {
                // Create users
                var admin = new User { Username = "AdminUser", Role = "Admin" };
                var user = new User { Username = "BasicUser", Role = "User" };

                // Initialize SecureStorage and set up encryption
                var storage = new SecureStorage();
                byte[] encryptionKey;
                byte[] initializationVector;

                using (var aes = System.Security.Cryptography.Aes.Create())
                {
                    aes.GenerateKey();
                    aes.GenerateIV();
                    encryptionKey = aes.Key;
                    initializationVector = aes.IV;

                    // Store encrypted data
                    storage.StoreData("Sensitive Information", aes.Key, aes.IV);
                }

                // Attempt to retrieve data as Admin
                try
                {
                    string adminData = storage.RetrieveData(admin, encryptionKey, initializationVector);
                    Console.WriteLine($"Admin Access: {adminData}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Admin Error: {ex.Message}");
                }

                // Attempt to retrieve data as Basic User
                try
                {
                    string userData = storage.RetrieveData(user, encryptionKey, initializationVector);
                    Console.WriteLine($"User Access: {userData}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"User Error: {ex.Message}");
                }
            }
        }
    }

```

# Compliance in cloud-native .NET 8 application
Data classification is the process of identifying, categorizing, and protecting content according to its sensitivity or impact level.
- End User Identifiable Information (EUII) - information used to identify an individual
- End User Pseudonymous Identifiers (EUPI) - information that can be used to identify an individual when combined with other information.

.NET uses Microsoft.Extensions.Compliance.Classification extension enables you to define DataClassification and DataClassificationAttribute properties.

``` c#
using Microsoft.Extensions.Compliance.DataClassification;

public static DataClassification EUIIDataClassification {get;} = new DataClassification("EUIIDataTaxonomy", "EUIIData");

public static DataClassification EUPDataClassification {get;} = new DataClassification("EUPDataTaxonomy", "EUPData");

public class EUIIDataAttribute : DataClassificationAttribute
{
    public EUIIDataAttribute() : base(DataClassifications.EUIIDataClassification) { }
}

public class EUPDataAttribute : DataClassificationAttribute
{
    public EUPDataAttribute() : base(DataClassifications.EUPDataClassification) { }
}

// Model:
public class User
{
    [EUIIData]
    public string Name { get; set; }

    [EUIIData]
    public string Address { get; set; }

    [EUPData]
    public string UserId { get; set; }
}
```