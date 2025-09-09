import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VoluntarioDTO {
  nome: string;
  email: string;
  telefone: string;
  disponibilidade?: string;
  mensagem?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {
  private apiUrl = 'http://localhost:8085/api/voluntarios';

  constructor(private http: HttpClient) { }

  criarVoluntario(voluntario: VoluntarioDTO): Observable<VoluntarioDTO> {
    return this.http.post<VoluntarioDTO>(this.apiUrl, voluntario);
  }

  listarVoluntarios(): Observable<VoluntarioDTO[]> {
    return this.http.get<VoluntarioDTO[]>(this.apiUrl);
  }
}