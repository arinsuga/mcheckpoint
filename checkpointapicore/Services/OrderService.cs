// Namespace: checkpointapicore.Services
// Packages: checkpointapicore.Data, checkpointapicore.DTOs, checkpointapicore.Models, System.Net.Mail

namespace checkpointapicore.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrders();
        Task<Order> GetOrderById(int id);
        Task<Order> AddOrder(OrderDto orderDto);
        Task<Order> UpdateOrder(int id, OrderDto orderDto);
        Task<bool> DeleteOrder(int id);
        Task SendOrderNotification(int orderId, string email);
    }

    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;

        public OrderService(ApplicationDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            return await _context.Orders.Include(o => o.Product).ToListAsync();
        }

        public async Task<Order> GetOrderById(int id)
        {
            return await _context.Orders.Include(o => o.Product).FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<Order> AddOrder(OrderDto orderDto)
        {
            var order = new Order
            {
                ProductId = orderDto.ProductId,
                Quantity = orderDto.Quantity,
                OrderDate = orderDto.OrderDate
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<Order> UpdateOrder(int id, OrderDto orderDto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return null;
            }

            order.ProductId = orderDto.ProductId;
            order.Quantity = orderDto.Quantity;
            order.OrderDate = orderDto.OrderDate;

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<bool> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return false;
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task SendOrderNotification(int orderId, string email)
        {
            var order = await GetOrderById(orderId);
            if (order != null)
            {
                string subject = "Order Confirmation";
                string body = $"Your order for {order.Quantity} unit(s) of {order.Product.Name} has been placed successfully.";
                _emailService.SendEmail(email, subject, body);
            }
        }
    }
}
