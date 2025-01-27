using GrabNEat.DTOs;
using GrabNEat.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GrabNEat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("{token}")]
        public async Task<IActionResult> GetAll(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodorderContext())
                    {
                        return Ok(await cx.Users.ToListAsync());
                    }
                } catch (Exception e)
                {
                    return BadRequest(e.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nincs jogod hozzá");
            }
        }



        [HttpGet("/EmailName/{token}")]
        public async Task<IActionResult> GetEmailName(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodorderContext())
                    {
                        return Ok(await cx.Users.Select(f =>  new EmailNameDTO {Email = f.Email, Name = f.Name }).ToListAsync());
                        
                    }
                }
                catch (Exception e)
                {
                    return BadRequest(e.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nincs jogod hozzá");
            }
        }


        [HttpPost("{token}")]
        public IActionResult Post(string token, User user)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodorderContext()) {
                        cx.Users.Add(user);
                        cx.SaveChanges();

                        return Ok("Új felhasznaló adatai rögzítve.");
                    }
                }
                catch (Exception e)
                {
                    return BadRequest(e.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nincs jogod hozzá");
            }
        }

        [HttpPut("{token}")]
        public IActionResult Put(string token, User user)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodorderContext())
                    {
                        cx.Users.Update(user);
                        cx.SaveChanges();

                        return Ok("Új felhasznaló adatai módosítva.");
                    }
                }
                catch (Exception e)
                {
                    return BadRequest(e.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nincs jogod hozzá");
            }
        }

        [HttpDelete("{token},{id}")]
        public IActionResult Post(string token, int id)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodorderContext())
                    {
                        cx.Users.Remove(new User { Id = id });
                        cx.SaveChanges();

                        return Ok("Feljhasználó törölve");
                    }
                }
                catch (Exception e)
                {
                    return BadRequest(e.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nincs jogod hozzá");
            }
        }
    } 
}
