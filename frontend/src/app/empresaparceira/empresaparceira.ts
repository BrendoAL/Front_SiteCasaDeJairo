import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empresaparceira',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empresaparceira.html',
  styleUrls: ['./empresaparceira.css']
})
export class Empresaparceira {
  empresaForm: FormGroup;
  formEnviado = false;
  sucesso = false;

  constructor(private http: HttpClient) {
    this.empresaForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl(''),
      mensagem: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.empresaForm.invalid) return;

    // POST para a API
    this.http.post('http://localhost:8085/api/empresa-parceira', this.empresaForm.value)
      .subscribe({
        next: (res) => {
          console.log('Enviado com sucesso:', res);
          this.formEnviado = true;
          this.sucesso = true;
          this.empresaForm.reset();
        },
        error: (err) => {
          console.error('Erro ao enviar formulário:', err);
          this.formEnviado = true;
          this.sucesso = false;
        }
      });
  }
}
