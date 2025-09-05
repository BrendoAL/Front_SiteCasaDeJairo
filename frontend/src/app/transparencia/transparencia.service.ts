import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transparencia {
data: string|number|Date;
  titulo: string;
  descricao: string;
  postImagemId?: number;
  dataPublicacao: string; // vem do backend como LocalDate -> string
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

  getImagem(id: number): string {
    return `${this.apiUrl}/imagem/${id}`;
  }
}
