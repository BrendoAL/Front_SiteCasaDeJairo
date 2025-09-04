import { Component, OnInit } from '@angular/core';
import { TransparenciaAdminService, Transparencia } from './transparencia-admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transparencia-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transparencia-admin.html'
})
export class TransparenciaAdminComponent implements OnInit {
  registros: Transparencia[] = [];

  // 👇 novo registro para o formulário
  novoRegistro: Transparencia = { titulo: '', descricao: '', data: '', postImagemId: undefined };

  constructor(private service: TransparenciaAdminService) {}

  ngOnInit(): void {
    this.carregarRegistros();
  }

  carregarRegistros(): void {
    this.service.listar().subscribe(data => this.registros = data);
  }

  salvarRegistro(): void {
    this.service.criar(this.novoRegistro).subscribe(() => {
      this.novoRegistro = { titulo: '', descricao: '', data: '', postImagemId: undefined }; // limpa o form
      this.carregarRegistros();
    });
  }

  atualizarRegistro(registro: Transparencia): void {
    if (registro.id) {
      this.service.atualizar(registro.id, registro).subscribe(() => this.carregarRegistros());
    }
  }

  deletarRegistro(id: number): void {
    this.service.deletar(id).subscribe(() => this.carregarRegistros());
  }
}
