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
}

@Component({
  selector: 'app-eventos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eventos-admin.html'
})
export class EventosAdminComponent implements OnInit {
  eventos: Evento[] = [];
  novoEvento: Evento = { titulo: '', descricao: '', data: '', local: '' };
  editando: boolean = false; // controla se estamos editando

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos() {
    this.http.get<Evento[]>('/api/eventos').subscribe(data => this.eventos = data);
  }

  salvarEvento() {
    if (this.editando && this.novoEvento.id) {
      // PUT para atualizar
      this.http.put<Evento>(`/api/eventos/${this.novoEvento.id}`, this.novoEvento).subscribe(() => {
        this.cancelarEdicao();
        this.carregarEventos();
      });
    } else {
      // POST para criar
      this.http.post<Evento>('/api/eventos', this.novoEvento).subscribe(() => {
        this.novoEvento = { titulo: '', descricao: '', data: '', local: '' };
        this.carregarEventos();
      });
    }
  }

  editarEvento(evento: Evento) {
    // copia os dados do evento para o formulário
    this.novoEvento = { ...evento };
    this.editando = true;
  }

  cancelarEdicao() {
    this.novoEvento = { titulo: '', descricao: '', data: '', local: '' };
    this.editando = false;
  }

  deletarEvento(id: number) {
    this.http.delete(`/api/eventos/${id}`).subscribe(() => this.carregarEventos());
  }
}

