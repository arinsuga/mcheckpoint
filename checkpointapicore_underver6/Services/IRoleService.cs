using checkpointapicore.Models;

namespace checkpointapicore.Services
{
    public interface IRoleService
    {
        IEnumerable<Role> GetAllRoles();
        Role GetRoleById(int id);
        void CreateRole(Role role);
        void UpdateRole(Role role);
        void DeleteRole(int id);
    }
}
