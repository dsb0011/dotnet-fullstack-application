using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CountriesController: ControllerBase
  {
    private readonly AppDbContext _context;

    public CountriesController(AppDbContext context)
    {
      _context = context;
    }

    // 
    [HttpGet] // GET REQUEST /api/countries/
    public async Task<IActionResult> GetCountries()
    {
      try {
      var countries = await _context.Countries.ToListAsync();
      return Ok(countries); // 200 OK STATUS CODE + Country OBJECTs
      }     
      catch(Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
      }
    }
  }
}