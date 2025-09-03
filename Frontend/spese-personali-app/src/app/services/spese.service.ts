import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spesa, Categoria } from '../models/spesa.model';

@Injectable({
  providedIn: 'root'
})
export class SpeseService {
  private apiUrl = 'https://localhost:7000/api';

  constructor(private http: HttpClient) { }

  // Spese
  getSpese(): Observable<Spesa[]> {
    return this.http.get<Spesa[]>(`${this.apiUrl}/spese`);
  }

  getSpesa(id: number): Observable<Spesa> {
    return this.http.get<Spesa>(`${this.apiUrl}/spese/${id}`);
  }

  createSpesa(spesa: Spesa): Observable<Spesa> {
    return this.http.post<Spesa>(`${this.apiUrl}/spese`, spesa);
  }

  updateSpesa(id: number, spesa: Spesa): Observable<any> {
    return this.http.put(`${this.apiUrl}/spese/${id}`, spesa);
  }

  deleteSpesa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/spese/${id}`);
  }

  getSpesePerCategoria(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/spese/per-categoria`);
  }

  getSpesePerMese(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/spese/per-mese`);
  }

  // Categorie
  getCategorie(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorie`);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/categorie/${id}`);
  }

  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/categorie`, categoria);
  }

  updateCategoria(id: number, categoria: Categoria): Observable<any> {
    return this.http.put(`${this.apiUrl}/categorie/${id}`, categoria);
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categorie/${id}`);
  }
}