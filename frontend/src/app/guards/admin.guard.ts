import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // ou onde você armazena o JWT
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/login']);
      return false;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    if (decodedToken.roles && decodedToken.roles.includes('ADMIN')) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
