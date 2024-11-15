using Microsoft.AspNetCore.Mvc;
using checkpointapicore.Models;
using checkpointapicore.Services;
using System.Collections.Generic;
using Swashbuckle.AspNetCore.Annotations;

namespace checkpointapicore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        // private readonly IRoleService _roleService;

        // public RolesController(IRoleService roleService)
        // {
        //     _roleService = roleService;
        // }

        // [HttpGet]
        // public ActionResult<IEnumerable<Role>> GetAll() => Ok(_roleService.GetAllRoles());

        // [HttpGet("{id}")]
        // public ActionResult<Role> GetById(int id)
        // {
        //     var role = _roleService.GetRoleById(id);
        //     if (role == null)
        //     {
        //         return NotFound();
        //     }
        //     return Ok(role);
        // }

        // [HttpPost]
        // public IActionResult Create(Role role)
        // {
        //     _roleService.CreateRole(role);
        //     return CreatedAtAction(nameof(GetById), new { id = role.Id }, role);
        // }

        // [HttpPut("{id}")]
        // public IActionResult Update(int id, Role role)
        // {
        //     if (id != role.Id)
        //     {
        //         return BadRequest();
        //     }
        //     _roleService.UpdateRole(role);
        //     return NoContent();
        // }

        // [HttpDelete("{id}")]
        // public IActionResult Delete(int id)
        // {
        //     _roleService.DeleteRole(id);
        //     return NoContent();
        // }

        public RolesController()
        {
        }

        [HttpGet]
        public ActionResult<IEnumerable<Role>> GetAll()
        {
            var roles = new List<Role>
            {
                new Role { Id = 1, Name = "Admin" },
                new Role { Id = 2, Name = "User" },
                new Role { Id = 3, Name = "Guest" },
                // Add more roles as needed
            };


            return Ok(roles);
        }

        [HttpGet("{id}")]
        public ActionResult<Role> GetById(int id)
        {
            var role = new Role { Id = 1, Name = "Admin" };
            if (role == null)
            {
                return NotFound();
            }
            return Ok(role);
        }


    }
}
