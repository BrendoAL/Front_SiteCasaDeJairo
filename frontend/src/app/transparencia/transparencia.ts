import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TransparenciaService, Transparencia } from './transparencia.service';

@Component({
  selector: 'app-transparencia',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './transparencia.html',
  styleUrls: ['./transparencia.css']
})
export class TransparenciaComponent implements OnInit {
onImageError($event: ErrorEvent) {
throw new Error('Method not implemented.');
}
  posts: Transparencia[] = [];

  constructor(private transparenciaService: TransparenciaService) { }

  ngOnInit(): void {
    this.transparenciaService.listar().subscribe({
      next: (dados) => (this.posts = dados),
      error: (err) => console.error('Erro ao carregar transparência:', err)
    });
  }

  getImagem(postImagemId?: number): string {
    if (!postImagemId) return '';
    return this.transparenciaService.getImagem(postImagemId);
  }
}
