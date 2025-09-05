import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransparenciaAdminService, Transparencia } from './transparencia-admin.service';

@Component({
  selector: 'app-transparencia-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transparencia-admin.html',
  styleUrls: ['./transparencia-admin.css']
})
export class TransparenciaAdminComponent implements OnInit {
  registros: Transparencia[] = [];

  // registro para formulário
  novoRegistro: Transparencia = { titulo: '', descricao: '', data: '', postImagemId: undefined };

  // flag de edição
  editando: boolean = false;

  // Para debug
  carregando: boolean = false;
  erro: string = '';

  constructor(private service: TransparenciaAdminService) { }

  ngOnInit(): void {
    this.carregarRegistros();
  }

  carregarRegistros(): void {
    this.carregando = true;
    this.erro = '';

    this.service.listar().subscribe({
      next: (data) => {
        console.log('Registros carregados:', data);
        this.registros = data;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar registros:', err);
        this.erro = 'Erro ao carregar registros';
        this.carregando = false;
      }
    });
  }

  salvarRegistro(): void {
    if (!this.novoRegistro.titulo.trim() || !this.novoRegistro.descricao.trim()) {
      alert('Título e descrição são obrigatórios!');
      return;
    }

    this.carregando = true;
    this.erro = '';

    if (this.editando && this.novoRegistro.id) {
      // atualização
      if (this.novoRegistro.imagem) {
        // Se tem imagem nova, use o método com imagem (se implementado)
        this.service.atualizarComImagem(this.novoRegistro.id, this.novoRegistro).subscribe({
          next: () => {
            console.log('Registro atualizado com imagem com sucesso');
            this.resetarFormulario();
            this.carregarRegistros();
          },
          error: (err) => {
            console.error('Erro ao atualizar com imagem:', err);
            this.erro = 'Erro ao atualizar registro';
            this.carregando = false;
          }
        });
      } else {
        // Atualização sem imagem nova
        this.service.atualizar(this.novoRegistro.id, this.novoRegistro).subscribe({
          next: () => {
            console.log('Registro atualizado com sucesso');
            this.resetarFormulario();
            this.carregarRegistros();
          },
          error: (err) => {
            console.error('Erro ao atualizar:', err);
            this.erro = 'Erro ao atualizar registro';
            this.carregando = false;
          }
        });
      }
    } else {
      // criação → verifica se tem imagem
      if (this.novoRegistro.imagem) {
        console.log('Criando com imagem...');
        this.service.criarComImagem(this.novoRegistro).subscribe({
          next: (resultado) => {
            console.log('Registro criado com imagem:', resultado);
            this.resetarFormulario();
            this.carregarRegistros();
          },
          error: (err) => {
            console.error('Erro ao criar com imagem:', err);
            this.erro = 'Erro ao criar registro com imagem';
            this.carregando = false;
          }
        });
      } else {
        console.log('Criando sem imagem...');
        this.service.criar(this.novoRegistro).subscribe({
          next: (resultado) => {
            console.log('Registro criado:', resultado);
            this.resetarFormulario();
            this.carregarRegistros();
          },
          error: (err) => {
            console.error('Erro ao criar:', err);
            this.erro = 'Erro ao criar registro';
            this.carregando = false;
          }
        });
      }
    }
  }

  atualizarRegistro(registro: Transparencia): void {
    this.novoRegistro = {
      ...registro,
      imagem: null // Limpa a imagem para evitar problemas
    };
    this.editando = true;
    console.log('Editando registro:', this.novoRegistro);
  }

  cancelarEdicao(): void {
    this.resetarFormulario();
  }

  deletarRegistro(id: number): void {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      this.service.deletar(id).subscribe({
        next: () => {
          console.log('Registro deletado com sucesso');
          this.carregarRegistros();
        },
        error: (err) => {
          console.error('Erro ao deletar:', err);
          this.erro = 'Erro ao deletar registro';
        }
      });
    }
  }

  private resetarFormulario(): void {
    this.novoRegistro = { titulo: '', descricao: '', data: '', postImagemId: undefined };
    this.editando = false;
    this.carregando = false;
    this.erro = '';

    // Limpa o input de arquivo
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onArquivoSelecionado(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validações básicas
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (file.size > maxSize) {
        alert('Arquivo muito grande! Máximo 5MB.');
        event.target.value = '';
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        alert('Tipo de arquivo não permitido! Use apenas imagens (JPEG, PNG, GIF, WebP).');
        event.target.value = '';
        return;
      }

      this.novoRegistro.imagem = file;
      console.log('Arquivo selecionado:', file.name, file.type, file.size);
    }
  }

  // Método para visualizar imagem (se necessário)
  getImagem(postImagemId?: number): string {
    if (!postImagemId) return '';
    return this.service.getImagem(postImagemId);
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (img) {
      img.style.display = 'none';
    }
  }
}