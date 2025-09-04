using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SpesePersonaliAPI.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;
        
        [StringLength(7)] // Per colore esadecimale #RRGGBB
        public string? Colore { get; set; }
        
        [StringLength(300)]
        public string? Descrizione { get; set; }
        
        [JsonIgnore]
        public List<Spesa> Spese { get; set; } = new List<Spesa>();
    }
}