import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoluntarioService, VoluntarioDTO } from '../voluntario/voluntario.service';

@Component({
  selector: 'app-admin-voluntarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-voluntario.html',
  styleUrls: ['./admin-voluntario.css']
})
export class AdminVoluntariosComponent implements OnInit {
  voluntarios: VoluntarioDTO[] = [];
  loading = false;
  erro = false;

  constructor(private voluntarioService: VoluntarioService) {}

  ngOnInit() {
    this.carregarVoluntarios();
  }

  carregarVoluntarios() {
    this.loading = true;
    this.erro = false;

    this.voluntarioService.listarVoluntarios()
      .subscribe({
        next: (voluntarios) => {
          this.voluntarios = voluntarios;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar voluntários:', err);
          this.erro = true;
          this.loading = false;
        }
      });
  }

  trackByEmail(index: number, voluntario: VoluntarioDTO): string {
    return voluntario.email;
  }

  getDisponibilidadeText(disponibilidade: string): string {
    const disponibilidades: { [key: string]: string } = {
      'manha': 'Manhã',
      'tarde': 'Tarde',
      'noite': 'Noite',
      'final-de-semana': 'Final de semana'
    };
    return disponibilidades[disponibilidade] || disponibilidade;
  }
}