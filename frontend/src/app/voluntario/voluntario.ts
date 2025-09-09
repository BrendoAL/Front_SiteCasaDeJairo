import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { VoluntarioService, VoluntarioDTO } from './voluntario.service';

@Component({
  selector: 'app-voluntario',
  templateUrl: './voluntario.html',
  styleUrls: ['./voluntario.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class VoluntarioComponent {
  formEnviado = false;
  sucesso = false;
  erro = false;

  voluntarioForm: FormGroup;

  constructor(private voluntarioService: VoluntarioService) {
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
      const voluntarioData: VoluntarioDTO = {
        nome: this.voluntarioForm.value.nome,
        email: this.voluntarioForm.value.email,
        telefone: this.voluntarioForm.value.telefone,
        disponibilidade: this.voluntarioForm.value.disponibilidade,
        mensagem: this.voluntarioForm.value.mensagem
      };

      this.voluntarioService.criarVoluntario(voluntarioData)
        .subscribe({
          next: (res) => {
            console.log('Voluntário cadastrado com sucesso:', res);
            this.formEnviado = true;
            this.sucesso = true;
            this.erro = false;
            this.voluntarioForm.reset();
            
            // Scroll para a mensagem de sucesso
            setTimeout(() => {
              const element = document.querySelector('.success-message');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 100);
          },
          error: (err) => {
            console.error('Erro ao cadastrar voluntário:', err);
            this.formEnviado = true;
            this.sucesso = false;
            this.erro = true;
            
            // Scroll para a mensagem de erro
            setTimeout(() => {
              const element = document.querySelector('.error-message');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 100);
          }
        });
    } else {
      // Marcar todos os campos como touched para mostrar erros
      Object.keys(this.voluntarioForm.controls).forEach(key => {
        this.voluntarioForm.get(key)?.markAsTouched();
      });
    }
  }

  receberNovidades() {
    alert('Em breve teremos um formulário para você se cadastrar!');
  }

  mensagemErro: string = 'Não foi possível enviar o formulário. Por favor, tente novamente mais tarde.';
}
