using FoodBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetFull()
        {
                try
                {
                    using (var cx = new FoodifyContext())
                    {
                        return Ok(await cx.Restaurants.ToListAsync());
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
        }

        [HttpGet("category/{category}")]
        public async Task<IActionResult> GetCategory(string category)
        {
            try
            {
                using (var cx = new FoodifyContext())
                {
                    return Ok(await cx.Restaurants.Where(f => f.Category == category).ToListAsync());
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
                        return Ok(await cx.Restaurants.FirstOrDefaultAsync(f => f.Id == id));
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
        public IActionResult Post(string token, [FromBody] Restaurant restaurant)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodifyContext())
                    {
                        cx.Restaurants.Add(restaurant);
                        cx.SaveChanges();
                        return Ok("Új étterem adatai rögzítve!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található az étterem!");
            }
        }

        [HttpPut("{token}")]
        public IActionResult Put(string token, Restaurant restaurant)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FoodifyContext())
                    {
                        cx.Restaurants.Update(restaurant);
                        cx.SaveChanges();
                        return Ok("Az étterem adatai módosítva!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található at étterem!");
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
                        cx.Restaurants.Remove(new Models.Restaurant { Id = id });
                        cx.SaveChanges();
                        return Ok("Az étterem adatai törölve!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }
            else
            {
                return BadRequest("Nem található az étterem!");
            }
        }
    }
}
