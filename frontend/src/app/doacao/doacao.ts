import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doacao',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doacao.html',
  styleUrls: ['./doacao.css']
})

export class Doacao {
  modalAberto = false;
  chavePix = '00020126360014BR.GOV.BCB.PIX0114458787680001095204000053039865802BR5901N6001C62150511CasadeJairo6304C17B';
  cnpj = '45878768000109';
  textoBotaoPix = 'Copiar';
  textoBotaoCnpj = 'Copiar';

  abrirModal() {
    this.modalAberto = true;
    this.textoBotaoPix = 'Copiar';
    this.textoBotaoCnpj = 'Copiar';
  }

  fecharModal() {
    this.modalAberto = false;
  }

  copiarChavePix() {
    navigator.clipboard.writeText(this.chavePix);
    this.textoBotaoPix = 'Copiado!';
  }

  copiarCnpj() {
    navigator.clipboard.writeText(this.cnpj);
    this.textoBotaoCnpj = 'Copiado!';
  }
}
