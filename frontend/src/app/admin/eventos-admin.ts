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
    
    this.http.get<Evento[]>('/api/eventos').subscribe({
      next: (data) => {
        this.eventos = data;
        this.carregando = false;
        console.log('Eventos carregados:', data);
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
        this.erro = 'Erro ao carregar eventos';
        this.carregando = false;
      }
    });
  }

  onArquivoSelecionado(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.arquivoSelecionado = file;
      this.novoEvento.imagem = file; 
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Método chamado pelo template
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
      this.http.put(`/api/eventos/${this.novoEvento.id}`, formData).subscribe({
        next: (response) => {
          console.log('Evento atualizado:', response);
          this.resetarForm();
          this.carregarEventos();
        },
        error: (err) => {
          console.error('Erro ao atualizar evento:', err);
          this.erro = 'Erro ao atualizar evento';
          this.carregando = false;
        }
      });
    } else {
      // POST para criar
      this.http.post('/api/eventos', formData).subscribe({
        next: (response) => {
          console.log('Evento criado:', response);
          this.resetarForm();
          this.carregarEventos();
        },
        error: (err) => {
          console.error('Erro ao criar evento:', err);
          this.erro = 'Erro ao criar evento';
          this.carregando = false;
        }
      });
    }
  }

  editarEvento(evento: Evento): void {
    this.novoEvento = { ...evento };
    this.editando = true;
    this.previewUrl = evento.imagemUrl || null;
    
    // Scroll para o formulário
    setTimeout(() => {
      document.querySelector('.admin-form')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  }

  cancelarEdicao(): void {
    this.resetarForm();
  }

  deletarEvento(id: number): void {
    const evento = this.eventos.find(e => e.id === id);
    if (!evento) return;

    const confirmacao = confirm(`Tem certeza que deseja excluir o evento "${evento.titulo}"?`);
    if (!confirmacao) return;

    this.carregando = true;
    this.erro = '';

    this.http.delete(`/api/eventos/${id}`).subscribe({
      next: () => {
        this.carregarEventos();
        console.log('Evento excluído');
      },
      error: (err) => {
        console.error('Erro ao excluir evento:', err);
        this.erro = 'Erro ao excluir evento';
        this.carregando = false;
      }
    });
  }

  // Método para compatibilidade com o template
  getImagem(imagemId: number): string {
    return `/api/imagens/${imagemId}`;
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
    
    // Limpar input de arquivo
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

  // Métodos utilitários para o template
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