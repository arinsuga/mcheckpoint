using Microsoft.EntityFrameworkCore;

using checkpointapicore.Data;
using checkpointapicore.Models;
using checkpointapicore.Services;

namespace checkpointapicore.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAllUsers()
        {

            return _context.Users.Include(u => u.Role).ToList();
        }

        public User GetUserById(int id) => _context.Users.Include(u => u.Role).FirstOrDefault(u => u.Id == id);
        public void CreateUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        public void UpdateUser(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }
        public void DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

    }
}
