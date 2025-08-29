import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { Eventos } from './eventos/eventos';
import { Doacao } from './doacao/doacao';
import { Empresaparceira } from './empresaparceira/empresaparceira';
import { Novasede } from './novasede/novasede';
import { TransparenciaComponent } from './transparencia/transparencia';
import { Voluntario } from './voluntario/voluntario';

import { AdminDashboardComponent } from './admin/admin-dashboard';
import { EventosAdminComponent } from './admin/eventos-admin.component';
import { TransparenciaAdminComponent } from './admin/transparencia-admin';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './login/login';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'eventos', component: Eventos },
  { path: 'doacao', component: Doacao },
  { path: 'empresaparceira', component: Empresaparceira },
  { path: 'novasede', component: Novasede },
  { path: 'transparencia', component: TransparenciaComponent },
  { path: 'voluntario', component: Voluntario },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'eventos', component: EventosAdminComponent },
      { path: 'transparencia', component: TransparenciaAdminComponent } 
    ]
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
