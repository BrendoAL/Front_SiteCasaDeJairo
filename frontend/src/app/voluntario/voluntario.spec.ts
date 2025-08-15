import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-voluntario',
  templateUrl: './voluntario.html',
  styleUrls: ['./voluntario.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class Voluntario {
  formEnviado = false; 

  voluntarioForm: FormGroup;

  constructor() {
    this.voluntarioForm = new FormGroup({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl(''),
      disponibilidade: new FormControl(''),
      mensagem: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.voluntarioForm.value);
    this.formEnviado = true;
  }

  receberNovidades() {
    alert('Em breve teremos um formulário para você se cadastrar!');
  }
}
