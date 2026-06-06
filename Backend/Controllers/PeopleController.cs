using System.ComponentModel.DataAnnotations.Schema;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PeopleController : ControllerBase
{

  // POST /api/people {body}
  // GET /api/people
  // GET /api/people/1
  // PUT /api/people/2 {body}
  // DELETE /api/people/2
  private readonly AppDbContext _context;

  public PeopleController(AppDbContext context)
  {
    _context = context;
  }

  // Successfully created the Front End requests
  [HttpPost] // POST /api/people
  public async Task<IActionResult> AddPerson(Person person)
  {
    try {
    _context.People.Add(person);
    await _context.SaveChangesAsync();
    return CreatedAtRoute("GetPerson", new{id=person.Id}, person); // 201 OK Status CODE + location of the resource (localhost:3000/api/people/{id}) PERSON Object
    }     
    catch(Exception ex)
    {
      return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
    }
  }

  // Successfully created the FRONT END REQUESTs
  [HttpGet] // GET REQUEST
  public async Task<IActionResult> GetPeople()
  {
    try {
    var people = await _context.People.ToListAsync();
    return Ok(people); // 200 OK STATUS CODE + PERSON OBJECTs
    }     
    catch(Exception ex)
    {
      return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
    }
  }

  [HttpGet("{id:int}", Name = "Getperson")] // GET REQUEST /api/people/1
  public async Task<IActionResult> GetPerson(int id)
  {
    try {
    var person = await _context.People.FindAsync(id);

    if(person  is null )
      {
        return NotFound(); // 404 Not Found Status Code
      }

    return Ok(person); 
    }     
    catch(Exception ex)
    {
      return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
    }
  }

  // Successfully created the Front End requests
  [HttpPut("{id:int}")] // PUT /api/people/$2
  public async Task<IActionResult> UpdatePerson(int id, [FromBody]Person person)
  {
    try {
      if(id != person.Id)
      {
        return BadRequest("Id's Mismatch!!");
      }

      if(!await _context.People.AnyAsync(p => p.Id == id))
      {
        return NotFound(); // 404
      }
      _context.People.Update(person);
      await _context.SaveChangesAsync();
      return NoContent(); // 204 Status Code
    }     
    catch(Exception ex)
    {
      return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
    }
  }

 // Successfully created the Front End requests
  [HttpDelete("{id:int}")] // DELETE /api/people/$2
  public async Task<IActionResult> DeletePerson(int id)
  {
    try 
    {
      var person = await _context.People.FindAsync(id);
      if(person  is null )
      {
        return NotFound(); // 404-NOTFOUND STATUS CODE
      }

      _context.People.Remove(person);
      await _context.SaveChangesAsync();
      return NoContent(); // 204 Status CODE
    }     
    catch(Exception ex)
    {
      return StatusCode(StatusCodes.Status500InternalServerError, ex.Message); // 500 Internal Server Error + Message will be in the response Body
    }
  }
}

// Server App: http://localhost:3000
// Clinet app : http://localhost:5173 => CORS