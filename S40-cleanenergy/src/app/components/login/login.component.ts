import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template:`
    <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-12 px-6 lg:px-8">
      <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-800">Welcome Back!</h2>
          <p class="text-sm text-gray-600">Sign in to your account</p>
        </div>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label for="userName" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="userName"
              type="text"
              formControlName="userName"
              class="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your Username"
              required
            />
            <div *ngIf="loginForm.get('userName')?.touched && loginForm.get('userName')?.errors" class="text-red-500 text-sm mt-1">
              <span *ngIf="loginForm.get('userName')?.errors?.['required']">Username is required</span>
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              formControlName="password"
              class="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
            <div *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.errors" class="text-red-500 text-sm mt-1">
              <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              [disabled]="!loginForm.valid || isLoading"
              class="w-full flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const subscription = this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.isLoading = false;
        }
      });
      this.subscription.add(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}