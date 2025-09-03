using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpesePersonaliAPI.Data;
using SpesePersonaliAPI.Models;

namespace SpesePersonaliAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpeseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SpeseController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Spesa>>> GetSpese()
        {
            return await _context.Spese.Include(s => s.Categoria).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Spesa>> GetSpesa(int id)
        {
            var spesa = await _context.Spese.Include(s => s.Categoria).FirstOrDefaultAsync(s => s.Id == id);

            if (spesa == null)
            {
                return NotFound();
            }

            return spesa;
        }

        [HttpPost]
        public async Task<ActionResult<Spesa>> PostSpesa(Spesa spesa)
        {
            _context.Spese.Add(spesa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSpesa), new { id = spesa.Id }, spesa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpesa(int id, Spesa spesa)
        {
            if (id != spesa.Id)
            {
                return BadRequest();
            }

            _context.Entry(spesa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SpesaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpesa(int id)
        {
            var spesa = await _context.Spese.FindAsync(id);
            if (spesa == null)
            {
                return NotFound();
            }

            _context.Spese.Remove(spesa);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("per-categoria")]
        public async Task<ActionResult<IEnumerable<object>>> GetSpesePerCategoria()
        {
            var result = await _context.Spese
                .Include(s => s.Categoria)
                .GroupBy(s => s.Categoria!.Nome)
                .Select(g => new 
                {
                    Categoria = g.Key,
                    TotaleSpesa = g.Sum(s => s.Importo),
                    NumeroSpese = g.Count()
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("per-mese")]
        public async Task<ActionResult<IEnumerable<object>>> GetSpesePerMese()
        {
            var result = await _context.Spese
                .GroupBy(s => new { s.Data.Year, s.Data.Month })
                .Select(g => new 
                {
                    Anno = g.Key.Year,
                    Mese = g.Key.Month,
                    TotaleSpesa = g.Sum(s => s.Importo),
                    NumeroSpese = g.Count()
                })
                .OrderBy(x => x.Anno)
                .ThenBy(x => x.Mese)
                .ToListAsync();

            return Ok(result);
        }

        private bool SpesaExists(int id)
        {
            return _context.Spese.Any(e => e.Id == id);
        }
    }
}