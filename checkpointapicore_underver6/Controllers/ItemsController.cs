using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using checkpointapicore.Data;
using checkpointapicore.Models;

namespace checkpointapicore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ItemsController(AppDbContext context)
        {
            _context = context;

            if (_context.Items.Count() == 0)
            {
                _context.Items.Add(new Item { Name = "Item1", Price = 10.00M });
                _context.Items.Add(new Item { Name = "Item2", Price = 20.00M });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult<List<Item>> GetAll() => _context.Items.ToList();

        [HttpGet("{id}")]
        public ActionResult<Item> GetById(int id)
        {
            var item = _context.Items.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpPost]
        public IActionResult Create(Item item)
        {
            _context.Items.Add(item);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Item item)
        {
            var existingItem = _context.Items.Find(id);
            if (existingItem == null)
            {
                return NotFound();
            }

            existingItem.Name = item.Name;
            existingItem.Price = item.Price;

            _context.Items.Update(existingItem);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = _context.Items.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
