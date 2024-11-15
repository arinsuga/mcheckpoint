// Models/ApplicationUser.cs
// Namespace: checkpointapicore.Models

namespace checkpointapicore.Models
{
    public class ApplicationUser : IdentityUser
    {
        // Additional properties can be added here
    }
}

// Models/Product.cs
namespace checkpointapicore.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}

// Models/Stock.cs
namespace checkpointapicore.Models
{
    public class Stock
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }

        public Product Product { get; set; }
    }
}

// Models/Order.cs
namespace checkpointapicore.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime OrderDate { get; set; }

        public Product Product { get; set; }
    }
}
