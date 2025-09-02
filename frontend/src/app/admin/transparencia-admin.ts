import { Component, OnInit } from '@angular/core';
import { TransparenciaAdminService, Transparencia } from './transparencia-admin.service';
'./transparencia-admin.html'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transparencia-admin',
  templateUrl: './transparencia-admin.html',
  imports: [CommonModule]
})

export class TransparenciaAdminComponent implements OnInit {

  registros: Transparencia[] = [];

  constructor(private service: TransparenciaAdminService) {}

  ngOnInit(): void {
    this.carregarRegistros();
  }

  carregarRegistros(): void {
    this.service.listar().subscribe(data => this.registros = data);
  }

  criarRegistro(novo: Transparencia): void {
    this.service.criar(novo).subscribe(() => this.carregarRegistros());
  }

  atualizarRegistro(registro: Transparencia): void {
    if (registro.id) this.service.atualizar(registro.id, registro).subscribe(() => this.carregarRegistros());
  }

  deletarRegistro(id: number): void {
    this.service.deletar(id).subscribe(() => this.carregarRegistros());
  }
}

