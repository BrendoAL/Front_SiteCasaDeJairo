import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Evento {
  id?: number;
  titulo: string;
  descricao: string;
  data: string;
  local?: string;
  eventoImagemId?: number;
  imagem?: File;
  imagemUrl?: string;
}

@Component({
  selector: 'app-eventos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eventos-admin.html',
  styleUrls: ['./eventos-admin.css']
})

export class EventosAdminComponent implements OnInit {
  private readonly API_URL = 'https://back-sitecasadejairo.onrender.com/api/eventos';

  eventos: Evento[] = [];
  novoEvento: Evento = {
    titulo: '',
    descricao: '',
    data: '',
    local: ''
  };

  editando = false;
  carregando = false;
  erro = '';
  arquivoSelecionado: File | null = null;
  previewUrl: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarEventos();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }

  carregarEventos(): void {
    this.carregando = true;
    this.erro = '';

    this.http.get<Evento[]>(this.API_URL, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (data) => {
        this.eventos = data.map(evento => ({
          ...evento,
          imagemUrl: evento.id ? `${this.API_URL}/imagem/${evento.id}` : undefined
        }));
        this.carregando = false;
        console.log('Eventos carregados:', this.eventos);
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
        this.erro = this.getErrorMessage(err);
        this.carregando = false;
      }
    });
  }

  salvarEvento(): void {
    if (!this.isFormValid()) {
      this.erro = 'Preencha todos os campos obrigatórios';
      return;
    }

    this.carregando = true;
    this.erro = '';

    console.log('=== DEBUG SALVAR EVENTO ===');
    console.log('Editando:', this.editando);
    console.log('Dados do evento:', this.novoEvento);
    console.log('Arquivo selecionado:', this.arquivoSelecionado?.name);

    const formData = new FormData();
    formData.append('titulo', this.novoEvento.titulo.trim());
    formData.append('descricao', this.novoEvento.descricao.trim());
    formData.append('data', this.novoEvento.data);
    formData.append('local', this.novoEvento.local || '');

    if (this.arquivoSelecionado) {
      formData.append('imagem', this.arquivoSelecionado, this.arquivoSelecionado.name);
      console.log('Imagem anexada:', this.arquivoSelecionado.name, this.arquivoSelecionado.size);
    }

    const headers = this.getAuthHeaders();

    if (this.editando && this.novoEvento.id) {
      // PUT para atualizar
      this.http.put(`${this.API_URL}/${this.novoEvento.id}`, formData, { headers }).subscribe({
        next: (response: any) => {
          console.log('Evento atualizado:', response);
          this.resetarForm();
          this.carregarEventos();
        },
        error: (err) => {
          console.error('Erro ao atualizar evento:', err);
          this.erro = this.getErrorMessage(err);
          this.carregando = false;
        }
      });
    } else {
      // POST para criar
      this.http.post(this.API_URL, formData, { headers }).subscribe({
        next: (response: any) => {
          console.log('Evento criado:', response);
          this.resetarForm();
          this.carregarEventos();
        },
        error: (err) => {
          console.error('Erro ao criar evento:', err);
          this.erro = this.getErrorMessage(err);
          this.carregando = false;
        }
      });
    }
  }

  deletarEvento(id: number): void {
    const evento = this.eventos.find(e => e.id === id);
    if (!evento) return;

    const confirmacao = confirm(`Tem certeza que deseja excluir o evento "${evento.titulo}"?`);
    if (!confirmacao) return;

    this.carregando = true;
    this.erro = '';

    this.http.delete(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => {
        this.carregarEventos();
        console.log('Evento excluído');
      },
      error: (err) => {
        console.error('Erro ao excluir evento:', err);
        this.erro = this.getErrorMessage(err);
        this.carregando = false;
      }
    });
  }

  private getErrorMessage(err: HttpErrorResponse): string {
    console.error('Erro completo:', err);

    if (err.status === 0) {
      return 'Erro de conexão. Verifique sua internet e se o servidor está funcionando.';
    }

    if (err.status === 401) {
      localStorage.removeItem('token'); // Limpar token inválido
      return 'Sessão expirada. Faça login novamente.';
    }

    if (err.status === 403) {
      return 'Acesso negado. Verifique suas permissões.';
    }

    if (err.status === 400) {
      if (err.error?.mensagem) {
        return err.error.mensagem;
      }
      if (typeof err.error === 'string') {
        return err.error;
      }
      return 'Dados inválidos. Verifique os campos preenchidos.';
    }

    if (err.status >= 500) {
      return 'Erro interno do servidor. Tente novamente em alguns instantes.';
    }

    return `Erro ${err.status}: ${err.statusText || 'Erro desconhecido'}`;
  }

  //tamanho maximo 20mb
  onArquivoSelecionado(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 20 * 1024 * 1024; // 20MB
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

      if (file.size > maxSize) {
        alert('Arquivo muito grande! Máximo 20MB.');
        event.target.value = '';
        return;
      }

      if (!allowedTypes.includes(file.type.toLowerCase())) {
        alert('Tipo de arquivo não permitido! Use apenas imagens (JPEG, PNG, GIF, WebP).');
        event.target.value = '';
        return;
      }

      this.arquivoSelecionado = file;
      this.novoEvento.imagem = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      console.log('Arquivo selecionado:', file.name, file.type, file.size);
    }
  }

  editarEvento(evento: Evento): void {
    this.novoEvento = { ...evento };
    this.editando = true;

    if (evento.id) {
      this.previewUrl = `${this.API_URL}/imagem/${evento.id}`;
    }

    setTimeout(() => {
      document.querySelector('.admin-form')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  }

  cancelarEdicao(): void {
    this.resetarForm();
  }

  getImagem(imagemId: number): string {
    return `${this.API_URL}/imagem/${imagemId}`;
  }

  private resetarForm(): void {
    this.novoEvento = {
      titulo: '',
      descricao: '',
      data: '',
      local: ''
    };
    this.editando = false;
    this.arquivoSelecionado = null;
    this.previewUrl = null;
    this.carregando = false;
    this.erro = '';

    const fileInput = document.getElementById('eventoFileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.novoEvento.titulo?.trim() &&
      this.novoEvento.descricao?.trim() &&
      this.novoEvento.data
    );
  }

  getImageUrl(evento: Evento): string {
    if (evento.id) {
      return `${this.API_URL}/imagem/${evento.id}`;
    }
    return 'assets/imagens/placeholder.jpg';
  }

  onImageError(event: any): void {
    console.log('Erro ao carregar imagem, usando placeholder');
    event.target.src = 'assets/imagens/placeholder.jpg';
  }

  truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
}