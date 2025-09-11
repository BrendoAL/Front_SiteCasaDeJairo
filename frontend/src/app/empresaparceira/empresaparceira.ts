import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface EmpresaParceiraDTO {
  nome: string;
  email: string;
  telefone?: string;
  mensagem: string;
}

@Component({
  selector: 'app-empresaparceira',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './empresaparceira.html',
  styleUrls: ['./empresaparceira.css']
})
export class Empresaparceira {
  empresaForm: FormGroup;
  formEnviado = false;
  sucesso = false;
  loading = false;
  errorMessage = '';

  private readonly API_URL = 'http://localhost:8088/api/empresa-parceira';

  constructor(private http: HttpClient) {
    this.empresaForm = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required, 
        Validators.email
      ]),
      telefone: new FormControl(''),
      mensagem: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ])
    });
  }

  onSubmit() {
    if (this.empresaForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    
    const empresaData: EmpresaParceiraDTO = {
      nome: this.empresaForm.get('nome')?.value,
      email: this.empresaForm.get('email')?.value,
      telefone: this.empresaForm.get('telefone')?.value || '',
      mensagem: this.empresaForm.get('mensagem')?.value
    };

    this.http.post<EmpresaParceiraDTO>(this.API_URL, empresaData)
      .subscribe({
        next: (response) => {
          console.log('Empresa parceira cadastrada com sucesso:', response);
          this.formEnviado = true;
          this.sucesso = true;
          this.loading = false;
          this.empresaForm.reset();
        },
        error: (error) => {
          console.error('Erro ao cadastrar empresa parceira:', error);
          this.formEnviado = true;
          this.sucesso = false;
          this.loading = false;
          
          if (error.status === 400 && error.error) {
            this.errorMessage = 'Dados inválidos. Verifique os campos preenchidos.';
          } else if (error.status === 0) {
            this.errorMessage = 'Erro de conexão. Verifique se o servidor está rodando.';
          } else {
            this.errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
          }
        }
      });
  }

  private markFormGroupTouched() {
    Object.keys(this.empresaForm.controls).forEach(key => {
      this.empresaForm.get(key)?.markAsTouched();
    });
  }

  // Métodos auxiliares para validação no template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.empresaForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.empresaForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} é obrigatório`;
      if (field.errors['email']) return 'Email inválido';
      if (field.errors['minlength']) return `${fieldName} deve ter pelo menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  resetForm() {
    this.empresaForm.reset();
    this.formEnviado = false;
    this.sucesso = false;
    this.errorMessage = '';
  }
}