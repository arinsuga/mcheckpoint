using Microsoft.AspNetCore.Mvc;
using checkpointapicore.Models;
using checkpointapicore.Services;
using System.Collections.Generic;
using Swashbuckle.AspNetCore.Annotations;

namespace checkpointapicore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // private readonly IUserService _userService;

        // public UsersController(IUserService userService)
        // {
        //     _userService = userService;
        // }

        // [HttpGet]
        // public ActionResult<IEnumerable<User>> GetAll() => Ok(_userService.GetAllUsers());

        // [HttpGet("{id}")]
        // public ActionResult<User> GetById(int id)
        // {
        //     var user = _userService.GetUserById(id);
        //     if (user == null)
        //     {
        //         return NotFound();
        //     }
        //     return Ok(user);
        // }

        // [HttpPost]
        // public IActionResult Create(User user)
        // {
        //     _userService.CreateUser(user);
        //     return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        // }

        // [HttpPut("{id}")]
        // public IActionResult Update(int id, User user)
        // {
        //     if (id != user.Id)
        //     {
        //         return BadRequest();
        //     }
        //     _userService.UpdateUser(user);
        //     return NoContent();
        // }

        // [HttpDelete("{id}")]
        // public IActionResult Delete(int id)
        // {
        //     _userService.DeleteUser(id);
        //     return NoContent();
        // }


        public UsersController()
        {
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> GetAll()
        {
            var users = new List<User>
            {
                new User { Id = 1, Username = "user1", Email = "user1@example.com", Password = "password1", RoleId = 1 },
                new User { Id = 2, Username = "user2", Email = "user2@example.com", Password = "password2", RoleId = 2 },
                // Add more users as needed
            };

            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetById(int id)
        {
            var user = new User { Id = 1, Username = "user1", Email = "user1@example.com", Password = "password1", RoleId = 1 };
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


    }
}
