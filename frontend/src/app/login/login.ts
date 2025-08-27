import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  erro = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.erro = '';
    this.http.post<{ token: string }>('http://localhost:8088/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);  // guarda JWT
        this.router.navigate(['/admin']);          // redireciona para painel
      },
      error: () => this.erro = 'Usuário ou senha inválidos'
    });
  }
}

