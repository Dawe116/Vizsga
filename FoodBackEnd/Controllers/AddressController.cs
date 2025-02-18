using FoodBackEnd.DTOs;
using FoodBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
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
                        return Ok(await cx.Addresses.ToListAsync());
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a cím!");
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
                        return Ok(await cx.Addresses.FirstOrDefaultAsync(f => f.Id == id));
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
        public IActionResult Post(string token, Address address)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodifyContext())
                    {
                        cx.Addresses.Add(address);
                        cx.SaveChanges();
                        return Ok("Új cím adatai rögzítve!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a cím!");
            }
        }

        [HttpPut("{token}")]
        public IActionResult Put(string token, Address address)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodifyContext())
                    {
                        cx.Addresses.Update(address);
                        cx.SaveChanges();
                        return Ok("A cím adatai módosítva!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a cím!");
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
                        cx.Addresses.Remove(new Models.Address { Id = id });
                        cx.SaveChanges();
                        return Ok("A cím adatai törölve!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található a cím!");
            }
        }
    }
}
