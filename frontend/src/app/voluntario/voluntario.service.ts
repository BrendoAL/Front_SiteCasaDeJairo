import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VoluntarioDTO {
  id?: number; // CAMPO ID ADICIONADO
  nome: string;
  email: string;
  telefone: string;
  disponibilidade?: string;
  mensagem?: string;
  aceitaEmails?: boolean; // CAMPO ADICIONADO
}

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {
  // CORREÇÃO: URL absoluta da API
  private apiUrl = 'https://back-sitecasadejairo.onrender.com/api/voluntarios';

  constructor(private http: HttpClient) { }

  criarVoluntario(voluntario: VoluntarioDTO): Observable<VoluntarioDTO> {
    return this.http.post<VoluntarioDTO>(this.apiUrl, voluntario);
  }

  listarVoluntarios(): Observable<VoluntarioDTO[]> {
    return this.http.get<VoluntarioDTO[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<VoluntarioDTO> {
    return this.http.get<VoluntarioDTO>(`${this.apiUrl}/${id}`);
  }

  atualizar(id: number, voluntario: VoluntarioDTO): Observable<VoluntarioDTO> {
    return this.http.put<VoluntarioDTO>(`${this.apiUrl}/${id}`, voluntario);
  }

  deletarVoluntario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}