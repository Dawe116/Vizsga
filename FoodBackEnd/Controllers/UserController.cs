using FoodBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodBackEnd.DTOs;

namespace FoodBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("{token}")]
        public async Task<IActionResult> GetFull(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodorderContext())
                    {
                        return Ok(await cx.Users.ToListAsync());
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a felhasználó!");
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
                        return Ok(await cx.Users.Select(f=> new EmailNameDTO { Email = f.Email, Name = f.Name}).ToListAsync());
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a felhasználó!");
            }
        }

        [HttpGet("{id},{token}")]
        public async Task<IActionResult> GetId(int id, string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodorderContext())
                    {
                        return Ok(await cx.Users.FirstOrDefaultAsync( f => f.Id == id ));
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nincs hozzá jogod!");
            }
        }

        [HttpPost("{token}")]
        public IActionResult Post(string token, User user)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodorderContext())
                    {
                        cx.Users.Add(user);
                        cx.SaveChanges();
                        return Ok("Új felhasználó adatai rögzítve!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a felhasználó!");
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
                        return Ok("A felhasználó adatai módosítva!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a felhasználó!");
            }
        }

        [HttpDelete("{token},{id}")]
        public IActionResult Delete(string token, int id)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodorderContext())
                    {
                        cx.Users.Remove(new Models.User { Id=id });
                        cx.SaveChanges();
                        return Ok("A felhasználó adatai törölve!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a felhasználó!");
            }
        }



    }
}
