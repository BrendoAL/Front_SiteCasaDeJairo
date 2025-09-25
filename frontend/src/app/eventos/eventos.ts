import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { ImageService } from './image.service';

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
  providers: [DatePipe, ImageService]
})

export class Eventos implements OnInit {
  eventos: Evento[] = [];
  eventoSelecionado: Evento | null = null;

  private apiUrl = 'https://back-sitecasadejairo.fly.dev/api';
  imgUrl: string = 'assets/imagens/placeholder.jpg';

  constructor(
    private imageService: ImageService,
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const url = 'https://back-sitecasadejairo.fly.dev/api/eventos/imagem/1';
    this.imageService.loadImage(url).subscribe(finalUrl => {
      this.imgUrl = finalUrl;
      this.cd.detectChanges();
    });

    this.carregarEventos();
  }

  carregarEventos(): void {
    this.http.get<Evento[]>(`${this.apiUrl}/eventos`).subscribe({
      next: (data) => {
        this.eventos = data.map(evento => {
          let imagemUrl = evento.id
            ? `${this.apiUrl}/eventos/imagem/${evento.id}`
            : 'assets/imagens/placeholder.jpg';
          if (imagemUrl.includes(this.apiUrl)) {
            const separator = imagemUrl.includes('?') ? '&' : '?';
            imagemUrl = `${imagemUrl}${separator}t=${Date.now()}`;
          }

          return { ...evento, imagemUrl };
        });

        console.log('Eventos carregados:', this.eventos);
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
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
    const img = event.target;
    const originalSrc = img.src;

    console.warn('Erro ao carregar imagem:', originalSrc);

    if (!img.src.includes('placeholder.jpg')) {
      img.src = 'assets/imagens/placeholder.jpg';

      setTimeout(() => {
        if (originalSrc && !originalSrc.includes('placeholder.jpg')) {
          const newImg = new Image();
          newImg.onload = () => {
            img.src = originalSrc;
          };
          newImg.onerror = () => {
            console.warn('Falha na segunda tentativa de carregar:', originalSrc);
          };
          newImg.src = originalSrc.includes('?') ?
            `${originalSrc}&retry=${Date.now()}` :
            `${originalSrc}?retry=${Date.now()}`;
        }
      }, 2000);
    }
  }

  preloadImage(evento: Evento): void {
    if (evento.imagemUrl && evento.imagemUrl.includes(this.apiUrl)) {
      const img = new Image();
      img.src = this.getImageUrl(evento);
    }
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

    this.preloadImage(evento);
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

  isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  onImageLoad(event: any): void {
    console.log('Imagem carregada com sucesso:', event.target.src);
  }

  trackByEventoId(index: number, evento: Evento): any {
    return evento.id || index;
  }
}