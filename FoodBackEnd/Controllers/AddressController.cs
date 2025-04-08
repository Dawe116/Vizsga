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
        [HttpGet]
        public async Task<IActionResult> GetFull()
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

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetId(int userId)
        {
            try
            {
                using (var cx = new FoodifyContext())
                {
                    return Ok(await cx.Addresses.FirstOrDefaultAsync(f => f.UserId == userId));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message);
            }
        }

        [HttpPost("{token}")]
        public IActionResult Post(string token, Address address)
        {
            try
            {
                if (address.CountyId == 0 || address.UserId == 0)
                {
                    return BadRequest("CountyId és UserId nem lehet 0.");
                }

                using (var cx = new FoodifyContext())
                {
                    var county = cx.Counties.FirstOrDefault(c => c.Id == address.CountyId);
                    var user = cx.Users.FirstOrDefault(u => u.Id == address.UserId);

                    if (county == null || user == null)
                    {
                        return BadRequest("Érvénytelen CountyId vagy UserId.");
                    }

                    address.County = county;
                    address.User = user;

                    cx.Addresses.Add(address);
                    cx.SaveChanges();

                    return Ok("Új cím rögzítve!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Hiba történt: {ex.Message}");
            }

        }

        [HttpPut("{token}")]
        public IActionResult Put(string token, Address address)
        {
            try
            {
                // A FoodifyContext példányosítása
                using (var cx = new FoodifyContext())
                {
                    // Ellenőrizzük, hogy létezik-e már a cím
                    var existingAddress = cx.Addresses.FirstOrDefault(a => a.Id == address.Id);

                    if (existingAddress == null)
                    {
                        return NotFound("Cím nem található.");
                    }

                    // Csak a módosítandó mezőket frissítjük
                    existingAddress.City = address.City;
                    existingAddress.Street = address.Street;
                    existingAddress.HouseNumber = address.HouseNumber;
                    existingAddress.Floor = address.Floor;
                    existingAddress.Door = address.Door;
                    existingAddress.PostalCode = address.PostalCode;
                    existingAddress.CountyId = address.CountyId;
                    existingAddress.UserId = address.UserId;

                    // Mentés
                    cx.SaveChanges();

                    return Ok("Cím frissítve!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Hiba történt: {ex.Message}");
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
