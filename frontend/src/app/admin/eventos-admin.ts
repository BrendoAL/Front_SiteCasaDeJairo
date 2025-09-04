import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Evento {
  id?: number;
  titulo: string;
  descricao: string;
  data: string;
  local: string;
  imagemUrl?: string; // URL da imagem - adicionado para consistência
}

@Component({
  selector: 'app-eventos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <h2>Gerenciar Eventos</h2>

      <!-- Formulário principal com imagem -->
      <form (ngSubmit)="salvarEventoComImagem()" enctype="multipart/form-data" class="form-evento">
        <div class="form-group">
          <label for="titulo">Título:</label>
          <input 
            id="titulo"
            [(ngModel)]="novoEvento.titulo" 
            name="titulo" 
            placeholder="Digite o título do evento" 
            required>
        </div>

        <div class="form-group">
          <label for="descricao">Descrição:</label>
          <textarea 
            id="descricao"
            [(ngModel)]="novoEvento.descricao" 
            name="descricao" 
            placeholder="Digite a descrição do evento" 
            rows="4"
            required></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="data">Data:</label>
            <input 
              id="data"
              [(ngModel)]="novoEvento.data" 
              type="date" 
              name="data" 
              required>
          </div>

          <div class="form-group">
            <label for="local">Local:</label>
            <input 
              id="local"
              [(ngModel)]="novoEvento.local" 
              name="local" 
              placeholder="Digite o local do evento" 
              required>
          </div>
        </div>

        <div class="form-group">
          <label for="imagem">Imagem do Evento:</label>
          <input 
            id="imagem"
            type="file" 
            (change)="onArquivoSelecionado($event)"
            accept="image/*"
            class="file-input">
          <div *ngIf="previewUrl" class="image-preview">
            <img [src]="previewUrl" alt="Preview da imagem">
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-salvar" [disabled]="!isFormValid()">
            {{ editando ? 'Salvar Alterações' : 'Cadastrar Evento' }}
          </button>
          <button *ngIf="editando" type="button" class="btn-cancelar" (click)="cancelarEdicao()">
            Cancelar
          </button>
        </div>
      </form>

      <hr class="divider">

      <!-- Lista de eventos -->
      <div class="eventos-list">
        <h3>Eventos Cadastrados</h3>
        <div *ngIf="eventos.length === 0" class="no-events">
          Nenhum evento cadastrado ainda.
        </div>
        
        <div *ngFor="let evento of eventos" class="evento-item">
          <div class="evento-info">
            <div class="evento-image">
              <img 
                [src]="getImageUrl(evento)" 
                [alt]="evento.titulo"
                (error)="onImageError($event)">
            </div>
            <div class="evento-details">
              <h4>{{ evento.titulo }}</h4>
              <p class="evento-date">{{ evento.data | date:'dd/MM/yyyy' }}</p>
              <p class="evento-local">{{ evento.local }}</p>
              <p class="evento-desc">{{ truncateText(evento.descricao, 100) }}</p>
            </div>
          </div>
          <div class="evento-actions">
            <button class="btn-edit" (click)="editarEvento(evento)">
              <i class="fa fa-edit"></i> Editar
            </button>
            <button class="btn-delete" (click)="confirmarExclusao(evento)">
              <i class="fa fa-trash"></i> Excluir
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de confirmação -->
      <div *ngIf="eventoParaExcluir" class="modal-overlay" (click)="cancelarExclusao()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h3>Confirmar Exclusão</h3>
          <p>Tem certeza que deseja excluir o evento "{{ eventoParaExcluir.titulo }}"?</p>
          <div class="modal-actions">
            <button class="btn-confirm" (click)="deletarEvento()">Sim, Excluir</button>
            <button class="btn-cancel" (click)="cancelarExclusao()">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./eventos-admin.css']
})
export class EventosAdminComponent implements OnInit {
  eventos: Evento[] = [];
  novoEvento: Evento = { titulo: '', descricao: '', data: '', local: '' };
  editando: boolean = false;
  arquivoSelecionado: File | null = null;
  previewUrl: string | null = null;
  eventoParaExcluir: Evento | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.http.get<Evento[]>('/api/eventos').subscribe({
      next: (data) => {
        this.eventos = data;
        console.log('Eventos carregados:', data);
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
      }
    });
  }

  onArquivoSelecionado(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.arquivoSelecionado = file;
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  salvarEventoComImagem(): void {
    if (!this.isFormValid()) return;

    const formData = new FormData();
    formData.append('titulo', this.novoEvento.titulo);
    formData.append('descricao', this.novoEvento.descricao);
    formData.append('data', this.novoEvento.data);
    formData.append('local', this.novoEvento.local);

    if (this.arquivoSelecionado) {
      formData.append('imagem', this.arquivoSelecionado);
      console.log('Arquivo selecionado:', this.arquivoSelecionado.name);
    } else {
      console.log('Nenhum arquivo selecionado');
    }

    // Debug: mostrar conteúdo do FormData
    console.log('FormData sendo enviado:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    if (this.editando && this.novoEvento.id) {
      // PUT para atualizar
      this.http.put(`/api/eventos/${this.novoEvento.id}`, formData).subscribe({
        next: (response) => {
          console.log('Resposta do servidor (PUT):', response);
          this.resetarForm();
          this.carregarEventos();
          alert('Evento atualizado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao atualizar evento:', err);
          alert('Erro ao atualizar evento. Tente novamente.');
        }
      });
    } else {
      // POST para criar
      this.http.post('/api/eventos', formData).subscribe({
        next: (response) => {
          console.log('Resposta do servidor (POST):', response);
          this.resetarForm();
          this.carregarEventos();
          alert('Evento cadastrado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao salvar evento:', err);
          alert('Erro ao cadastrar evento. Tente novamente.');
        }
      });
    }
  }

  editarEvento(evento: Evento): void {
    this.novoEvento = { ...evento };
    this.editando = true;
    this.previewUrl = evento.imagemUrl || null;
    
    // Scroll para o formulário
    document.querySelector('.form-evento')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  cancelarEdicao(): void {
    this.resetarForm();
  }

  confirmarExclusao(evento: Evento): void {
    this.eventoParaExcluir = evento;
  }

  cancelarExclusao(): void {
    this.eventoParaExcluir = null;
  }

  deletarEvento(): void {
    if (!this.eventoParaExcluir?.id) return;

    this.http.delete(`/api/eventos/${this.eventoParaExcluir.id}`).subscribe({
      next: () => {
        this.carregarEventos();
        this.eventoParaExcluir = null;
        alert('Evento excluído com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao excluir evento:', err);
        alert('Erro ao excluir evento. Tente novamente.');
      }
    });
  }

  private resetarForm(): void {
    this.novoEvento = { titulo: '', descricao: '', data: '', local: '' };
    this.editando = false;
    this.arquivoSelecionado = null;
    this.previewUrl = null;
  }

  isFormValid(): boolean {
    return !!(
      this.novoEvento.titulo.trim() &&
      this.novoEvento.descricao.trim() &&
      this.novoEvento.data &&
      this.novoEvento.local.trim()
    );
  }

  getImageUrl(evento: Evento): string {
    if (evento.imagemUrl && evento.imagemUrl.trim() !== '') {
      return evento.imagemUrl.startsWith('http') 
        ? evento.imagemUrl 
        : evento.imagemUrl;
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