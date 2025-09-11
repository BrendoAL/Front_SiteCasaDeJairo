import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doacao.html',
  styleUrls: ['./doacao.css']
})
export class Doacao {
  modalAberto = false;
  chavePix = '00020126360014BR.GOV.BCB.PIX0114458787680001095204000053039865802BR5901N6001C62150511CasadeJairo6304C17B';
  textoBotao = 'Copiar Chave PIX'; // texto inicial do botão

  abrirModal() {
    this.modalAberto = true;
    this.textoBotao = 'Copiar Chave PIX'; // reseta o botão ao abrir
  }

  fecharModal() {
    this.modalAberto = false;
  }

  copiarChavePix() {
    navigator.clipboard.writeText(this.chavePix).then(() => {
      this.textoBotao = 'Texto Copiado ✅';

      // Opcional: volta ao texto original depois de 2 segundos
      setTimeout(() => {
        this.textoBotao = 'Copiar Chave PIX';
      }, 2000);
    }).catch(err => {
      console.error('Erro ao copiar chave PIX: ', err);
    });
  }
}
