import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  carregarEventos(): void {
    this.carregando = true;
    this.erro = '';
    
    this.http.get<Evento[]>(this.API_URL).subscribe({
      next: (data) => {
        this.eventos = data;
        this.carregando = false;
        console.log('Eventos carregados:', data);
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
        this.erro = this.getErrorMessage(err);
        this.carregando = false;
      }
    });
  }

  salvarEvento(): void {
    if (!this.isFormValid()) return;

    this.carregando = true;
    this.erro = '';

    const formData = new FormData();
    formData.append('titulo', this.novoEvento.titulo);
    formData.append('descricao', this.novoEvento.descricao);
    formData.append('data', this.novoEvento.data);
    if (this.novoEvento.local) {
      formData.append('local', this.novoEvento.local);
    }

    if (this.arquivoSelecionado) {
      formData.append('imagem', this.arquivoSelecionado);
    }

    if (this.editando && this.novoEvento.id) {
      // PUT para atualizar
      this.http.put(`${this.API_URL}/${this.novoEvento.id}`, formData).subscribe({
        next: (response) => {
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
      // POST para criar - URL CORRIGIDA
      this.http.post(this.API_URL, formData).subscribe({
        next: (response) => {
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

    // URL CORRIGIDA
    this.http.delete(`${this.API_URL}/${id}`).subscribe({
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

  // Método para extrair mensagens de erro mais claras
  private getErrorMessage(err: any): string {
    if (err.status === 0) {
      return 'Erro de conexão. Verifique se o servidor está rodando na porta 8088.';
    }
    if (err.error?.mensagem) {
      return err.error.mensagem;
    }
    if (err.error?.message) {
      return err.error.message;
    }
    if (err.message) {
      return err.message;
    }
    return 'Erro desconhecido. Tente novamente.';
  }

  // Restante dos métodos mantidos igual...
  onArquivoSelecionado(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.arquivoSelecionado = file;
      this.novoEvento.imagem = file; 
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  editarEvento(evento: Evento): void {
    this.novoEvento = { ...evento };
    this.editando = true;
    this.previewUrl = evento.imagemUrl || null;
    
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
    return `https://back-sitecasadejairo.onrender.com/api/eventos/imagem/${imagemId}`;
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
    if (evento.eventoImagemId) {
      return this.getImagem(evento.eventoImagemId);
    }
    if (evento.imagemUrl) {
      return evento.imagemUrl;
    }
    return 'assets/imagens/placeholder.jpg';
  }

  onImageError(event: any): void {
    event.target.src = 'assets/imagens/placeholder.jpg';
  }

  truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
}