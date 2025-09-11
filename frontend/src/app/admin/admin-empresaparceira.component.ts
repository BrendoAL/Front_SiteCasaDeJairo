import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

interface EmpresaParceiraDTO {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
  mensagem: string;
}

@Component({
  selector: 'app-admin-empresaparceira',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './admin-empresaparceira.html',
  styleUrls: ['./admin-empresaparceira.css']
})
export class AdminEmpresaParceiraComponent implements OnInit {
  empresas: EmpresaParceiraDTO[] = [];
  empresaForm: FormGroup;
  loading = false;
  editando = false;
  empresaEditandoId: number | null = null;
  mensagemSucesso = '';
  mensagemErro = '';
  expandedRows: Set<number> = new Set();

  private readonly API_URL = 'http://localhost:8088/api/empresa-parceira';

  constructor(private http: HttpClient) {
    this.empresaForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl(''),
      mensagem: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  ngOnInit() {
    this.carregarEmpresas();
  }

  carregarEmpresas() {
    this.loading = true;
    this.http.get<EmpresaParceiraDTO[]>(this.API_URL).subscribe({
      next: (empresas) => {
        this.empresas = empresas;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar empresas:', error);
        this.mensagemErro = 'Erro ao carregar empresas parceiras';
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.empresaForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading = true;
    const empresaData = this.empresaForm.value;

    if (this.editando && this.empresaEditandoId) {
      // Atualizar empresa existente
      this.http.put<EmpresaParceiraDTO>(`${this.API_URL}/${this.empresaEditandoId}`, empresaData)
        .subscribe({
          next: () => {
            this.mensagemSucesso = 'Empresa atualizada com sucesso!';
            this.resetForm();
            this.carregarEmpresas();
          },
          error: (error) => {
            console.error('Erro ao atualizar empresa:', error);
            this.mensagemErro = 'Erro ao atualizar empresa';
            this.loading = false;
          }
        });
    } else {
      // Criar nova empresa
      this.http.post<EmpresaParceiraDTO>(this.API_URL, empresaData).subscribe({
        next: () => {
          this.mensagemSucesso = 'Empresa cadastrada com sucesso!';
          this.resetForm();
          this.carregarEmpresas();
        },
        error: (error) => {
          console.error('Erro ao cadastrar empresa:', error);
          this.mensagemErro = 'Erro ao cadastrar empresa';
          this.loading = false;
        }
      });
    }
  }

  editarEmpresa(empresa: EmpresaParceiraDTO) {
    this.editando = true;
    this.empresaEditandoId = empresa.id || null;
    
    this.empresaForm.patchValue({
      nome: empresa.nome,
      email: empresa.email,
      telefone: empresa.telefone,
      mensagem: empresa.mensagem
    });

    // Scroll para o formulário
    document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  excluirEmpresa(id: number) {
    if (!confirm('Tem certeza que deseja excluir esta empresa parceira?')) {
      return;
    }

    this.loading = true;
    this.http.delete(`${this.API_URL}/${id}`).subscribe({
      next: () => {
        this.mensagemSucesso = 'Empresa excluída com sucesso!';
        this.carregarEmpresas();
      },
      error: (error) => {
        console.error('Erro ao excluir empresa:', error);
        this.mensagemErro = 'Erro ao excluir empresa';
        this.loading = false;
      }
    });
  }

  toggleMensagem(empresaId: number) {
    if (this.expandedRows.has(empresaId)) {
      this.expandedRows.delete(empresaId);
    } else {
      this.expandedRows.add(empresaId);
    }
  }

  isMensagemExpanded(empresaId: number): boolean {
    return this.expandedRows.has(empresaId);
  }

  resetForm() {
    this.empresaForm.reset();
    this.editando = false;
    this.empresaEditandoId = null;
    this.loading = false;
    this.limparMensagens();
  }

  private markFormGroupTouched() {
    Object.keys(this.empresaForm.controls).forEach(key => {
      this.empresaForm.get(key)?.markAsTouched();
    });
  }

  private limparMensagens() {
    setTimeout(() => {
      this.mensagemSucesso = '';
      this.mensagemErro = '';
    }, 5000);
  }

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

  truncateText(text: string, maxLength: number = 100): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}