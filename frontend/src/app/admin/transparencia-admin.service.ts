import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transparencia {
  id?: number;
  titulo: string;
  descricao: string;
  data?: string;
  postImagemId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransparenciaAdminService {
  private apiUrl = 'http://localhost:8088/api/transparencia';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  listar(): Observable<Transparencia[]> {
    return this.http.get<Transparencia[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  criar(dto: Transparencia): Observable<Transparencia> {
    return this.http.post<Transparencia>(this.apiUrl, dto, { headers: this.getAuthHeaders() });
  }

  atualizar(id: number, dto: Transparencia): Observable<Transparencia> {
    return this.http.put<Transparencia>(`${this.apiUrl}/${id}`, dto, { headers: this.getAuthHeaders() });
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
