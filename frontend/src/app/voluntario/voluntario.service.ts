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
  private apiUrl = 'http://localhost:8088/api/voluntarios';

  constructor(private http: HttpClient) { }

  criarVoluntario(voluntario: VoluntarioDTO): Observable<VoluntarioDTO> {
    return this.http.post<VoluntarioDTO>(this.apiUrl, voluntario);
  }

  listarVoluntarios(): Observable<VoluntarioDTO[]> {
    return this.http.get<VoluntarioDTO[]>(this.apiUrl);
  }

  // MÉTODO PARA DELETAR VOLUNTÁRIO
  deletarVoluntario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // MÉTODO PARA BUSCAR POR EMAIL
  buscarPorEmail(email: string): Observable<VoluntarioDTO> {
    return this.http.get<VoluntarioDTO>(`${this.apiUrl}/email/${email}`);
  }
}