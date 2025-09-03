import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeseService } from '../../services/spese.service';
import { Spesa, Categoria } from '../../models/spesa.model';

@Component({
  selector: 'app-spesa-form',
  templateUrl: './spesa-form.component.html',
  styleUrls: ['./spesa-form.component.css']
})
export class SpesaFormComponent implements OnInit {
  @Output() speseUpdated = new EventEmitter<void>();
  
  spesaForm: FormGroup;
  categorie: Categoria[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private speseService: SpeseService
  ) {
    this.spesaForm = this.fb.group({
      descrizione: ['', [Validators.required, Validators.maxLength(200)]],
      importo: ['', [Validators.required, Validators.min(0.01)]],
      data: [new Date(), Validators.required],
      categoriaId: ['', Validators.required],
      note: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    this.loadCategorie();
  }

  loadCategorie(): void {
    this.speseService.getCategorie().subscribe({
      next: (data) => this.categorie = data,
      error: (error) => console.error('Errore nel caricamento delle categorie:', error)
    });
  }

  onSubmit(): void {
    if (this.spesaForm.valid) {
      this.isLoading = true;
      const spesaData: Spesa = {
        id: 0,
        ...this.spesaForm.value
      };

      this.speseService.createSpesa(spesaData).subscribe({
        next: () => {
          this.isLoading = false;
          this.spesaForm.reset({
            data: new Date()
          });
          this.speseUpdated.emit();
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Errore nella creazione della spesa:', error);
        }
      });
    }
  }

  get descrizione() { return this.spesaForm.get('descrizione'); }
  get importo() { return this.spesaForm.get('importo'); }
  get data() { return this.spesaForm.get('data'); }
  get categoriaId() { return this.spesaForm.get('categoriaId'); }
  get note() { return this.spesaForm.get('note'); }
}
