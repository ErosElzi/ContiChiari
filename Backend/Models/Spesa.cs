using System.ComponentModel.DataAnnotations;

namespace SpesePersonaliAPI.Models
{
    public class Spesa
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Descrizione { get; set; } = string.Empty;
        
        [Required]
        public decimal Importo { get; set; }
        
        [Required]
        public DateTime Data { get; set; }
        
        public int CategoriaId { get; set; }
        public Categoria? Categoria { get; set; }
        
        [StringLength(500)]
        public string? Note { get; set; }
    }
}