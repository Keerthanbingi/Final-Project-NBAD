import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, Routes } from '@angular/router';
import { LoginComponent } from './app/components/login/login.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { SummaryComponent } from './app/components/summary/summary.component';
import { ReportsComponent } from './app/components/reports/reports.component';
import { AuthorizedGuard } from './app/guards/authhorized';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthorizedGuard] },
  { path: 'summary', component: SummaryComponent, canActivate: [AuthorizedGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthorizedGuard] },
  { path: '**', redirectTo: '/login' }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
  name = 'S40';
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
  ]
}).catch(err => console.error(err));