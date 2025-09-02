import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    console.log(' AdminGuard - Token:', token ? 'Presente' : 'Ausente');
    
    if (!token) {
      console.log('❌ AdminGuard - Sem token');
      this.router.navigate(['/login']);
      return false;
    }

    if (this.jwtHelper.isTokenExpired(token)) {
      console.log('❌ AdminGuard - Token expirado');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log(' AdminGuard - Token decodificado:', decodedToken);
    
    // Verificar se tem role ADMIN
    const roles = decodedToken.roles || [];
    const hasAdmin = roles.includes('ROLE_ADMIN');
    
    console.log(' AdminGuard - Roles:', roles);
    console.log(' AdminGuard - É admin?', hasAdmin);

    if (hasAdmin) {
      return true;
    }

    console.log('❌ AdminGuard - Acesso negado');
    this.router.navigate(['/']);
    return false;
  }
}
