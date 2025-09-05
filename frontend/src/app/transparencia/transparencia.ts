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
  posts: Transparencia[] = [];

  // Para o modal
  modalAberto = false;
  postSelecionado: Transparencia | null = null;

  constructor(private transparenciaService: TransparenciaService) { }

  ngOnInit(): void {
    this.transparenciaService.listar().subscribe({
      next: (dados) => {
        this.posts = dados.map(post => ({
          ...post,
          data: post.data ? new Date(post.data + 'T00:00:00') : new Date()
        }));
      },
      error: (err) => console.error('Erro ao carregar transparência:', err)
    });
  }

  getImagem(postImagemId?: number): string {
    if (!postImagemId) return '';
    return this.transparenciaService.getImagem(postImagemId);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.style.display = 'none';
      // Ou substitua por uma imagem padrão:
      // img.src = 'assets/images/no-image.png';
    }
  }

  // Métodos para o modal
  abrirModal(post: Transparencia): void {
    this.postSelecionado = post;
    this.modalAberto = true;
    document.body.style.overflow = 'hidden'; // Impede scroll da página
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.postSelecionado = null;
    document.body.style.overflow = 'auto'; // Restaura scroll da página
  }

  // Fecha modal ao clicar no backdrop
  fecharModalBackdrop(event: Event): void {
    if (event.target === event.currentTarget) {
      this.fecharModal();
    }
  }
}