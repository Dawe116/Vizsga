using FoodBackEnd.DTOs;
using FoodBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        [HttpGet("{token}")]
        public async Task<IActionResult> GetFull(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodifyContext())
                    {
                        return Ok(await cx.Permissions.ToListAsync());
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a jogosultság!");
            }
        }


        [HttpPost("{token}")]
        public IActionResult Post(string token, Permission permission)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodifyContext())
                    {
                        cx.Permissions.Add(permission);
                        cx.SaveChanges();
                        return Ok("Új jogosultság adatai rögzítve!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a jogosultság!");
            }
        }

        [HttpPut("{token}")]
        public IActionResult Put(string token, Permission permission)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodifyContext())
                    {
                        cx.Permissions.Update(permission);
                        cx.SaveChanges();
                        return Ok("A jogosultság adatai módosítva!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a jpgosultság!");
            }
        }

        [HttpDelete("{token},{id}")]
        public IActionResult Delete(string token, int id)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodifyContext())
                    {
                        cx.Permissions.Remove(new Models.Permission { Id = id });
                        cx.SaveChanges();
                        return Ok("A jogosultság adatai törölve!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a jogosultság!");
            }
        }
    }
}
