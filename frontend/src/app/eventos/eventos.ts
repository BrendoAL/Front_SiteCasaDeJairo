import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

interface Evento {
  titulo: string;
  descricao: string;
  data: string;   // LocalDate vem como string da API
  local: string;
}

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule], // necessário para *ngFor, date pipe etc.
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.css'],
  providers: [DatePipe]
})
export class Eventos implements OnInit, AfterViewInit {

  eventos: Evento[] = [];

  constructor(private http: HttpClient, private el: ElementRef) {}

  ngOnInit(): void {
    this.http.get<Evento[]>('/api/eventos').subscribe({
      next: (dados) => this.eventos = dados,
      error: (err) => console.error('Erro ao carregar eventos:', err)
    });
  }

  ngAfterViewInit(): void {
    const track = this.el.nativeElement.querySelector('.slider-track') as HTMLElement;
    if (!track) return; // evita erro se não tiver slider

    const slides = track.querySelectorAll('img');
    let index = 0;

    function nextSlide() {
      index++;
      if (index >= slides.length) {
        index = 0;
      }
      const width = slides[0].clientWidth;
      track.style.transform = `translateX(-${index * width}px)`;
    }

    if (slides.length > 0) {
      setInterval(nextSlide, 3000);
    }
  }
}

