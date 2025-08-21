import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { Eventos } from './eventos/eventos';
import { Doacao } from './doacao/doacao';
import { Empresaparceira } from './empresaparceira/empresaparceira';
import { Novasede } from './novasede/novasede';
import { Transparencia } from './transparencia/transparencia';
import { Voluntario } from './voluntario/voluntario';
// Update the import to match the actual export from './admin/admin-dashboard'
import { AdminDashboardComponent } from './admin/admin-dashboard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'eventos', component: Eventos },
  { path: 'doacao', component: Doacao },
  { path: 'empresaparceira', component: Empresaparceira },
  { path: 'novasede', component: Novasede },
  { path: 'transparencia', component: Transparencia },
  { path: 'voluntario', component: Voluntario },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};

