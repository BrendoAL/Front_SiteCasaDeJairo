import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

interface Evento {
  id?: number;
  titulo: string;
  descricao: string;
  data: string;
  local: string;
  imagemUrl?: string; 
}

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.css'],
  providers: [DatePipe]
})
export class Eventos implements OnInit {
  eventos: Evento[] = [];
  eventoSelecionado: Evento | null = null;
  
  private apiUrl = 'https://back-sitecasadejairo.onrender.com/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.http.get<Evento[]>(`${this.apiUrl}/eventos`).subscribe({
      next: (data) => {
        // Adiciona imagemUrl para cada evento
        this.eventos = data.map(evento => ({
          ...evento,
          imagemUrl: evento.id ? `${this.apiUrl}/eventos/imagem/${evento.id}` : 'assets/imagens/placeholder.jpg'
        }));

        console.log('Eventos carregados:', this.eventos);
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
        // Dados de exemplo caso a API falhe
        this.eventos = [
          {
            id: 1,
            titulo: 'Campanha de Alimentos',
            descricao: 'Campanha solidária para arrecadação de alimentos não perecíveis.',
            data: '2024-12-20',
            local: 'Casa de Jairo',
            imagemUrl: 'assets/imagens/alimentos.jpg'
          },
          {
            id: 2,
            titulo: 'Oficina de Informática',
            descricao: 'Curso básico de informática para crianças e adolescentes.',
            data: '2024-12-25',
            local: 'Laboratório de Informática',
            imagemUrl: 'assets/imagens/informatica.jpg'
          }
        ];
      }
    });
  }

  getImageUrl(evento: Evento): string {
    return evento.imagemUrl || 'assets/imagens/placeholder.jpg';
  }

  onImageError(event: any): void {
    console.warn('Erro ao carregar imagem:', event.target.src);
    event.target.src = 'assets/imagens/placeholder.jpg';
  }

  truncateDescription(text: string, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  abrirPopup(evento: Evento): void {
    console.log('Abrindo popup para evento:', evento);
    this.eventoSelecionado = evento;
    document.body.style.overflow = 'hidden';
  }

  fecharPopup(): void {
    console.log('Fechando popup');
    this.eventoSelecionado = null;
    document.body.style.overflow = 'auto';
  }

  currentSlideIndex = 0;
  imagens = [
    { src: 'assets/imagens/arte.jpg', alt: 'Oficina de Artes', title: 'Oficina de Artes' },
    { src: 'assets/imagens/alimentos.jpg', alt: 'Campanha de Alimentos', title: 'Campanha de Alimentos' },
    { src: 'assets/imagens/informatica.jpg', alt: 'Curso de Informática', title: 'Curso de Informática' },
    { src: 'assets/imagens/criancasjiu.jpg', alt: 'Atividades Recreativas', title: 'Atividades Recreativas' },
    { src: 'assets/imagens/cozinha.jpg', alt: 'Cozinha Comunitária', title: 'Cozinha Comunitária' }
  ];

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.imagens.length;
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.imagens.length) % this.imagens.length;
  }

  goToSlide(index: number) {
    this.currentSlideIndex = index;
  }
}

