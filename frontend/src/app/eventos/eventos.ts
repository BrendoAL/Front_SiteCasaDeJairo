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
  
  // URL da API
  private apiUrl = 'https://back-sitecasadejairo.onrender.com/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos(): void {
    // AQUI ESTÁ A CORREÇÃO: usando URL absoluta
    this.http.get<Evento[]>(`${this.apiUrl}/eventos`).subscribe({
      next: (data) => {
        this.eventos = data;
        console.log('Eventos carregados:', data);
        // Debug: verificar URLs das imagens
        data.forEach(evento => {
          console.log(`Evento: ${evento.titulo}, ImagemUrl: ${evento.imagemUrl}`);
        });
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
        // Dados de exemplo para teste caso a API não esteja disponível
        this.eventos = [
          {
            id: 1,
            titulo: 'Evento de Teste 1',
            descricao: 'Este é um evento de teste para demonstrar o funcionamento do componente. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            data: '2024-12-15',
            local: 'Centro de Eventos',
            imagemUrl: 'assets/imagens/arte.jpg'
          },
          {
            id: 2,
            titulo: 'Campanha de Alimentos',
            descricao: 'Campanha solidária para arrecadação de alimentos não perecíveis para famílias carentes.',
            data: '2024-12-20',
            local: 'Casa de Jairo',
            imagemUrl: 'assets/imagens/alimentos.jpg'
          },
          {
            id: 3,
            titulo: 'Oficina de Informática',
            descricao: 'Curso básico de informática para crianças e adolescentes.',
            data: '2024-12-25',
            local: 'Laboratório de Informática',
            imagemUrl: 'assets/imagens/informatica.jpg'
          }
        ];
        console.log('Usando dados de exemplo:', this.eventos);
      }
    });
  }

  getImageUrl(evento: Evento): string {
    console.log(`Debugging evento: ${evento.titulo}`);
    console.log(`imagemUrl recebida:`, evento.imagemUrl);
    
    if (evento.imagemUrl && evento.imagemUrl.trim() !== '') {
      let imageUrl = '';
      
      if (evento.imagemUrl.startsWith('http')) {
        imageUrl = evento.imagemUrl;
      } 
      else if (evento.imagemUrl.startsWith('/')) {
        imageUrl = evento.imagemUrl;
      }
      else {
        // Para imagens da API
        imageUrl = `${this.apiUrl}/eventos/imagem/${evento.imagemUrl}`;
      }
      
      console.log(`URL final da imagem: ${imageUrl}`);
      return imageUrl;
    } 
    
    // Imagem padrão
    console.log(`Usando placeholder para: ${evento.titulo}`);
    return 'assets/imagens/placeholder.jpg';
  }

  onImageError(event: any): void {
    console.warn('Erro ao carregar imagem:', event.target.src);
    event.target.src = 'assets/imagens/placeholder.jpg';
    console.log('Substituída por placeholder');
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
}