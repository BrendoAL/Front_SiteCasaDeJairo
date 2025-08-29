import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-voluntario',
  templateUrl: './voluntario.html',
  styleUrls: ['./voluntario.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class Voluntario {
  formEnviado = false;
  sucesso = false;
  erro = false;

  voluntarioForm: FormGroup;

  constructor(private http: HttpClient) {
    this.voluntarioForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl(''),
      disponibilidade: new FormControl('', Validators.required),
      mensagem: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.voluntarioForm.valid) {
      this.http.post('http://localhost:8085/api/voluntarios', this.voluntarioForm.value)
        .subscribe({
          next: (res) => {
            console.log('Resposta do backend:', res);
            this.formEnviado = true;
            this.sucesso = true;
            this.erro = false;
            this.voluntarioForm.reset();
          },
          error: (err) => {
            console.error('Erro ao enviar formulário:', err);
            this.formEnviado = true;
            this.sucesso = false;
            this.erro = true;
          }
        });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  receberNovidades() {
    alert('Em breve teremos um formulário para você se cadastrar!');
  }
}
