import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
export class TransparenciaService {
  private apiUrl = 'http://localhost:8088/api/transparencia';

  constructor(private http: HttpClient) {}

  listar(): Observable<Transparencia[]> {
    return this.http.get<Transparencia[]>(this.apiUrl);
  }
}
