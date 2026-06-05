using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

// Way to connect iwht the Database
public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

  // It will create the Table Name People in the Database
  public DbSet<Person> People { get; set; }
  public DbSet<Country> Countries {get; set;}

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Country>().HasData(
      new Country {Id= 1, Name= "India", IsoCode="IN", Capital="New Delhi", Continent="Asia"},
      new Country {Id= 2, Name= "USA", IsoCode="US", Capital="Washington DC", Continent="North America"},
      new Country {Id= 3, Name= "Spain", IsoCode="ESP", Capital="Madrid", Continent="Europe"},
      new Country {Id= 4, Name= "New Zealand", IsoCode="NZE", Capital="Wellington", Continent="Ocenia"},
      new Country {Id= 5, Name= "Brazil", IsoCode="BRA", Capital="Rio De Janeiro", Continent="South America"}
    );
  }
}