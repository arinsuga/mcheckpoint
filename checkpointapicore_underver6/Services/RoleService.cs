using Microsoft.EntityFrameworkCore;

using checkpointapicore.Data;
using checkpointapicore.Models;
using checkpointapicore.Services;

namespace checkpointapicore.Services
{
    public class RoleService : IRoleService
    {
        private readonly AppDbContext _context;

        public RoleService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Role> GetAllRoles() => _context.Roles.Include(r => r.Users).ToList();
        public Role GetRoleById(int id) => _context.Roles.Include(r => r.Users).FirstOrDefault(r => r.Id == id);
        public void CreateRole(Role role)
        {
            _context.Roles.Add(role);
            _context.SaveChanges();
        }
        public void UpdateRole(Role role)
        {
            _context.Roles.Update(role);
            _context.SaveChanges();
        }
        public void DeleteRole(int id)
        {
            var role = _context.Roles.Find(id);
            if (role != null)
            {
                _context.Roles.Remove(role);
                _context.SaveChanges();
            }
        }
    }
}
