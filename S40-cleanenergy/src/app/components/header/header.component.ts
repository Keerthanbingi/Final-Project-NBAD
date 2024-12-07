import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template:`
  <header class="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Left Navigation Links -->
        <div class="flex items-center space-x-8">
          <a
            routerLink="/dashboard"
            class="text-sm font-medium px-3 py-2 rounded-md transition duration-200"
            [class.bg-white]="isActive('/dashboard')"
            [class.text-indigo-600]="isActive('/dashboard')"
            [class.text-white]="!isActive('/dashboard')"
            [class.hover:bg-indigo-500]="!isActive('/dashboard')"
          >
            Dashboard
          </a>
          <a
            routerLink="/summary"
            class="text-sm font-medium px-3 py-2 rounded-md transition duration-200"
            [class.bg-white]="isActive('/summary')"
            [class.text-indigo-600]="isActive('/summary')"
            [class.text-white]="!isActive('/summary')"
            [class.hover:bg-indigo-500]="!isActive('/summary')"
          >
            Summary
          </a>
          <a
            routerLink="/reports"
            class="text-sm font-medium px-3 py-2 rounded-md transition duration-200"
            [class.bg-white]="isActive('/reports')"
            [class.text-indigo-600]="isActive('/reports')"
            [class.text-white]="!isActive('/reports')"
            [class.hover:bg-indigo-500]="!isActive('/reports')"
          >
            Reports
          </a>
        </div>

        <!-- Logout Button -->
        <div class="flex items-center">
          <button
            (click)="logout()"
            class="ml-8 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  </header>
  `
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}