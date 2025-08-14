import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

interface Post {
  titulo: string;
  conteudo: string;
  data: Date;
}

@Component({
  selector: 'app-transparencia',
  templateUrl: './transparencia.html',
  styleUrls: ['./transparencia.css'],
  standalone: true,
  imports: [CommonModule, DatePipe]
})
export class Transparencia {
  posts: Post[] = [
    { titulo: 'Exemplo 1', conteudo: 'Conteúdo do post 1', data: new Date() },
    { titulo: 'Exemplo 2', conteudo: 'Conteúdo do post 2', data: new Date() }
  ];
}
