using FoodBackEnd.DTOs;
using FoodBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountyController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetFull()
        {
            
                try
                {
                    using (var cx = new FoodifyContext())
                    {
                        return Ok(await cx.Counties.ToListAsync());
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            
        }

        [HttpGet("{id},{token}")]
        public async Task<IActionResult> GetId(int id, string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodifyContext())
                    {
                        return Ok(await cx.Counties.FirstOrDefaultAsync(f => f.Id == id));
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
        public IActionResult Post(string token, County county)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodifyContext())
                    {
                        cx.Counties.Add(county);
                        cx.SaveChanges();
                        return Ok("Új megye adatai rögzítve!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a megye!");
            }
        }

        [HttpPut("{token}")]
        public IActionResult Put(string token, County county)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodifyContext())
                    {
                        cx.Counties.Update(county);
                        cx.SaveChanges();
                        return Ok("A megye adatai módosítva!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a megye!");
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
                        cx.Counties.Remove(new Models.County { Id = id });
                        cx.SaveChanges();
                        return Ok("A megye adatai törölve!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a megye!");
            }
        }
    }
}
