import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transparencia {
  id?: number;
  titulo: string;
  descricao: string;
  data?: string;
  dataPublicacao?: string; // Adicione este campo se o backend retornar com esse nome
  postImagemId?: number;
  imagem?: File | null;
}

@Injectable({
  providedIn: 'root'
})
export class TransparenciaAdminService {
  private apiUrl = 'http://localhost:8088/api/transparencia';

  constructor(private http: HttpClient) { }

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

  // Método para obter imagem (similar ao serviço público)
  getImagem(postImagemId: number): string {
    return `${this.apiUrl}/${postImagemId}/imagem`;
  }

  // envia Transparencia com arquivo para o endpoint multipart
  criarComImagem(dto: Transparencia): Observable<Transparencia> {
    const formData = new FormData();
    formData.append('titulo', dto.titulo);
    formData.append('descricao', dto.descricao);
    formData.append('data', dto.data || '');

    if (dto.imagem) {
      formData.append('imagem', dto.imagem);
    }

    // Importante: Para FormData, não incluir Content-Type no header
    // O navegador define automaticamente o boundary correto
    const headers = new HttpHeaders({ 
      Authorization: `Bearer ${localStorage.getItem('token')}` 
    });

    return this.http.post<Transparencia>(
      `${this.apiUrl}/com-imagem`,
      formData,
      { headers }
    );
  }

  // Método para atualizar com imagem (caso precise no futuro)
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