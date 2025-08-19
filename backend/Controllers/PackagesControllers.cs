

using PackageTracking.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PackageTracking.DTOs;

namespace PackageTracking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PackagesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PackagesController(AppDbContext context)
        {
            _context = context;
        }

        // GET all packages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Package>>> GetPackages()
        {
            var packages = await _context.Packages
                                        .Include(p => p.PackageStatusHistory)
                                        .ToListAsync();

            return Ok(packages);
        }

        // GET package by Id
        [HttpGet("{Id}")]
        public async Task<ActionResult<Package>> GetPackage(int Id)
{
    var package = await _context.Packages
                                .Include(p => p.PackageStatusHistory)
                                .FirstOrDefaultAsync(p => p.Id == Id);

    if (package == null)
    {
        return NotFound();
    }

    return package;
}

        // POST create new package
        [HttpPost]
        public async Task<ActionResult<Package>> CreatePackage([FromBody] PackageCreateDto packageDto)
        {

            var package = new Package
            {
                SenderName = packageDto.SenderName,
                SenderAddress = packageDto.SenderAddress,
                SenderPhone = packageDto.SenderPhone,
                RecipientName = packageDto.RecipientName,
                RecipientAddress = packageDto.RecipientAddress,
                RecipientPhone = packageDto.RecipientPhone,
                TrackingNumber = Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper(),
                Status = "Created",
                PackageStatusHistory = new List<PackageStatusHistory>
                {
                    new PackageStatusHistory 
                    { 
                        Status = "Created", 
                        Timestamp = DateTime.UtcNow
                    }
                }
            };
            _context.Packages.Add(package);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPackage), new { id = package.Id }, package);
        }

        // PUT Update existing package by Id
        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdatePackageDetails(int Id, [FromBody] PackageCreateDto  updatedPackage)
        {

            var package = await _context.Packages.FindAsync(Id);
            if (package == null)
            {
                return NotFound();
            }

            package.SenderName = updatedPackage.SenderName;
            package.SenderAddress = updatedPackage.SenderAddress;
            package.SenderPhone = updatedPackage.SenderPhone;
            package.RecipientName = updatedPackage.RecipientName;
            package.RecipientAddress = updatedPackage.RecipientAddress;
            package.RecipientPhone = updatedPackage.RecipientPhone;


            await _context.SaveChangesAsync();

            return Accepted(package);
        }

        // DELETE delete package by Id
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeletePackage(int Id)
        {
            var package = await _context.Packages.FindAsync(Id);
            if (package == null)
            {
                return NotFound();
            }

            _context.Packages.Remove(package);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}