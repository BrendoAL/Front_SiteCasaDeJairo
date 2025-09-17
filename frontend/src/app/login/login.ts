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

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    this.erro = '';
    console.log(' Fazendo login...', { username: this.username });

    this.http.post<{ token: string }>(
      'https://back-sitecasadejairo.onrender.com/api/auth/login',
      {
        username: this.username.trim(), 
        password: this.password.trim()
      }
    ).subscribe({
      next: res => {
        console.log('✅ Login bem-sucedido:', res);
        localStorage.setItem('token', res.token);

        // Debug: decodificar token
        try {
          const payload = JSON.parse(atob(res.token.split('.')[1]));
          console.log(' Token payload:', payload);
        } catch (e) {
          console.error('❌ Erro ao decodificar token:', e);
        }

        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('❌ Erro no login:', err);
        if (err.status === 401) this.erro = 'Usuário ou senha inválidos';
        else this.erro = 'Erro ao conectar com o servidor';
      }
    });
  }
}