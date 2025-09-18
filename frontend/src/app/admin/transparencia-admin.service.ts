import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
    console.log('Token disponível:', !!token);
    
    if (!token) {
      console.warn('Token não encontrado no localStorage');
      return new HttpHeaders();
    }
    
    return new HttpHeaders({ 
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erro HTTP:', error);
    
    let errorMessage = 'Erro desconhecido';
    
    if (error.status === 0) {
      errorMessage = 'Erro de conexão com o servidor';
    } else if (error.status === 401) {
      errorMessage = 'Não autorizado - faça login novamente';
      // Opcional: limpar token e redirecionar para login
      localStorage.removeItem('token');
    } else if (error.status === 403) {
      errorMessage = 'Acesso negado';
    } else if (error.status === 400) {
      errorMessage = error.error?.mensagem || 'Dados inválidos';
    } else if (error.status >= 500) {
      errorMessage = 'Erro interno do servidor';
    }
    
    return throwError(() => new Error(errorMessage));
  }

  listar(): Observable<Transparencia[]> {
    return this.http.get<Transparencia[]>(this.apiUrl, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      tap(data => console.log('Registros carregados:', data.length)),
      catchError(this.handleError)
    );
  }

  criar(dto: Transparencia): Observable<Transparencia> {
    return this.http.post<Transparencia>(this.apiUrl, dto, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  atualizar(id: number, dto: Transparencia): Observable<Transparencia> {
    return this.http.put<Transparencia>(`${this.apiUrl}/${id}`, dto, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  getImagem(postImagemId: number): string {
    return `${this.apiUrl}/imagem/${postImagemId}`;
  }

  criarComImagem(dto: Transparencia): Observable<Transparencia> {
    console.log('=== CRIANDO COM IMAGEM ===');
    console.log('DTO:', dto);
    console.log('Imagem:', dto.imagem?.name, dto.imagem?.size, dto.imagem?.type);
    
    const formData = new FormData();
    formData.append('titulo', dto.titulo.trim());
    formData.append('descricao', dto.descricao.trim());
    formData.append('data', dto.data || new Date().toISOString().split('T')[0]);

    if (dto.imagem && dto.imagem instanceof File) {
      formData.append('imagem', dto.imagem, dto.imagem.name);
      console.log('Imagem anexada ao FormData:', dto.imagem.name);
    } else {
      console.log('Nenhuma imagem para anexar');
    }

    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    console.log('Enviando FormData para:', `${this.apiUrl}/com-imagem`);
    console.log('Headers:', headers);

    return this.http.post<Transparencia>(
      `${this.apiUrl}/com-imagem`,
      formData,
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(response => console.log('Resposta do servidor:', response)),
      catchError((error) => {
        console.error('Erro detalhado:', error);
        return this.handleError(error);
      })
    );
  }

  atualizarComImagem(id: number, dto: Transparencia): Observable<Transparencia> {
    console.log('=== ATUALIZANDO COM IMAGEM ===');
    console.log('ID:', id);
    console.log('DTO:', dto);
    
    const formData = new FormData();
    formData.append('titulo', dto.titulo.trim());
    formData.append('descricao', dto.descricao.trim());
    formData.append('data', dto.data || new Date().toISOString().split('T')[0]);

    if (dto.imagem && dto.imagem instanceof File) {
      formData.append('imagem', dto.imagem, dto.imagem.name);
      console.log('Nova imagem anexada:', dto.imagem.name);
    }

    return this.http.put<Transparencia>(
      `${this.apiUrl}/${id}/com-imagem`,
      formData,
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(response => console.log('Atualização bem-sucedida:', response)),
      catchError(this.handleError)
    );
  }
}