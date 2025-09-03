using Microsoft.EntityFrameworkCore;
using SpesePersonaliAPI.Models;

namespace SpesePersonaliAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        
        public DbSet<Spesa> Spese { get; set; }
        public DbSet<Categoria> Categorie { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configurazione per Spesa
            modelBuilder.Entity<Spesa>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Importo).HasColumnType("decimal(10,2)");
                entity.HasOne(e => e.Categoria)
                      .WithMany(c => c.Spese)
                      .HasForeignKey(e => e.CategoriaId);
            });
            
            // Configurazione per Categoria
            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Nome).IsUnique();
            });
            
            // Dati iniziali per le categorie
            modelBuilder.Entity<Categoria>().HasData(
                new Categoria { Id = 1, Nome = "Alimentari", Colore = "#4CAF50", Descrizione = "Spese per cibo e bevande" },
                new Categoria { Id = 2, Nome = "Trasporti", Colore = "#2196F3", Descrizione = "Benzina, mezzi pubblici, taxi" },
                new Categoria { Id = 3, Nome = "Casa", Colore = "#FF9800", Descrizione = "Affitto, bollette, manutenzione" },
                new Categoria { Id = 4, Nome = "Salute", Colore = "#F44336", Descrizione = "Medico, farmaci, visite" },
                new Categoria { Id = 5, Nome = "Intrattenimento", Colore = "#9C27B0", Descrizione = "Cinema, ristoranti, hobby" },
                new Categoria { Id = 6, Nome = "Abbigliamento", Colore = "#607D8B", Descrizione = "Vestiti e accessori" },
                new Categoria { Id = 7, Nome = "Altro", Colore = "#795548", Descrizione = "Spese varie" }
            );
        }
    }
}