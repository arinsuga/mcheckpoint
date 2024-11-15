// Namespace: checkpointapicore.Services
// Packages: checkpointapicore.Data, checkpointapicore.DTOs, checkpointapicore.Models

namespace checkpointapicore.Services
{
    public interface IStockService
    {
        Task<IEnumerable<Stock>> GetAllStocks();
        Task<Stock> GetStockById(int id);
        Task<Stock> AddStock(StockDto stockDto);
        Task<Stock> UpdateStock(int id, StockDto stockDto);
        Task<bool> DeleteStock(int id);
    }

    public class StockService : IStockService
    {
        private readonly ApplicationDbContext _context;

        public StockService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Stock>> GetAllStocks()
        {
            return await _context.Stocks.ToListAsync();
        }

        public async Task<Stock> GetStockById(int id)
        {
            return await _context.Stocks.FindAsync(id);
        }

        public async Task<Stock> AddStock(StockDto stockDto)
        {
            var stock = new Stock
            {
                ProductId = stockDto.ProductId,
                Quantity = stockDto.Quantity
            };

            _context.Stocks.Add(stock);
            await _context.SaveChangesAsync();
            return stock;
        }

        public async Task<Stock> UpdateStock(int id, StockDto stockDto)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null)
            {
                return null;
            }

            stock.ProductId = stockDto.ProductId;
            stock.Quantity = stockDto.Quantity;

            _context.Stocks.Update(stock);
            await _context.SaveChangesAsync();
            return stock;
        }

        public async Task<bool> DeleteStock(int id)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null)
            {
                return false;
            }

            _context.Stocks.Remove(stock);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
