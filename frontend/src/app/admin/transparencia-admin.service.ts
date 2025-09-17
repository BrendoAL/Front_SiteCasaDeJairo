import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transparencia {
  id?: number;
  titulo: string;
  descricao: string;
  data?: string;
  postImagemId?: number;
  imagem?: File | null;
}

@Injectable({
  providedIn: 'root'
})
export class TransparenciaAdminService {
  private apiUrl = 'https://back-sitecasadejairo.onrender.com/api/transparencia';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  listar(): Observable<Transparencia[]> {
    return this.http.get<Transparencia[]>(this.apiUrl, { 
      headers: this.getAuthHeaders() 
    });
  }

  criar(dto: Transparencia): Observable<Transparencia> {
    return this.http.post<Transparencia>(this.apiUrl, dto, { 
      headers: this.getAuthHeaders() 
    });
  }

  atualizar(id: number, dto: Transparencia): Observable<Transparencia> {
    return this.http.put<Transparencia>(`${this.apiUrl}/${id}`, dto, { 
      headers: this.getAuthHeaders() 
    });
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  // 🔹 CORRIGIDO: URL correta para buscar imagem
  getImagem(postImagemId: number): string {
    return `${this.apiUrl}/imagem/${postImagemId}`;
  }

  // Cria transparência com arquivo para o endpoint multipart
  criarComImagem(dto: Transparencia): Observable<Transparencia> {
    const formData = new FormData();
    formData.append('titulo', dto.titulo);
    formData.append('descricao', dto.descricao);
    formData.append('data', dto.data || '');

    if (dto.imagem) {
      formData.append('imagem', dto.imagem);
    }

    // Para FormData, não incluir Content-Type no header
    const headers = new HttpHeaders({ 
      Authorization: `Bearer ${localStorage.getItem('token')}` 
    });

    return this.http.post<Transparencia>(
      `${this.apiUrl}/com-imagem`,
      formData,
      { headers }
    );
  }

  // 🔹 CORRIGIDO: Método para atualizar com imagem usando o novo endpoint
  atualizarComImagem(id: number, dto: Transparencia): Observable<Transparencia> {
    const formData = new FormData();
    formData.append('titulo', dto.titulo);
    formData.append('descricao', dto.descricao);
    formData.append('data', dto.data || '');

    if (dto.imagem) {
      formData.append('imagem', dto.imagem);
    }

    const headers = new HttpHeaders({ 
      Authorization: `Bearer ${localStorage.getItem('token')}` 
    });

    return this.http.put<Transparencia>(
      `${this.apiUrl}/${id}/com-imagem`,
      formData,
      { headers }
    );
  }
}