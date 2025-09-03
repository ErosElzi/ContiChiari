export interface Spesa {
  id: number;
  descrizione: string;
  importo: number;
  data: Date;
  categoriaId: number;
  categoria?: Categoria;
  note?: string;
}

export interface Categoria {
  id: number;
  nome: string;
  colore?: string;
  descrizione?: string;
}