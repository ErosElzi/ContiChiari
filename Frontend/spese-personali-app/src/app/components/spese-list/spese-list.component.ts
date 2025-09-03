import { Component, OnInit } from '@angular/core';
import { SpeseService } from '../../services/spese.service';
import { Spesa } from '../../models/spesa.model';

@Component({
  selector: 'app-spese-list',
  templateUrl: './spese-list.component.html',
  styleUrls: ['./spese-list.component.css']
})
export class SpeseListComponent implements OnInit {
  spese: Spesa[] = [];
  displayedColumns: string[] = ['data', 'descrizione', 'categoria', 'importo', 'azioni'];

  constructor(private speseService: SpeseService) { }

  ngOnInit(): void {
    this.loadSpese();
  }

  loadSpese(): void {
    this.speseService.getSpese().subscribe({
      next: (data) => this.spese = data,
      error: (error) => console.error('Errore nel caricamento delle spese:', error)
    });
  }

  deleteSpesa(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa spesa?')) {
      this.speseService.deleteSpesa(id).subscribe({
        next: () => this.loadSpese(),
        error: (error) => console.error('Errore nell\'eliminazione della spesa:', error)
      });
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }
}
