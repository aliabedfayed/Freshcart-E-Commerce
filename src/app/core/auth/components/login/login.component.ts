import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ValidationMessagesComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean = true
  resMsg: string = ""
  authForm!: FormGroup
  subscription: Subscription = new Subscription()

  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)

  formInit() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    })
  }

  submitForm() {
    this.isLoading = false
    if (this.authForm.valid || !this.isLoading) {

      this.subscription = (this.authService.login(this.authForm.value).subscribe({
        next: (res) => {
          this.isLoading = true
          if (res.message == 'success') {
            this.authService.saveToken(res.token)
            this.router.navigate(['/home'])
          }
        },
        error: (error) => {
          this.resMsg = error.error.message
          this.isLoading = true
        }
      }))
    }
  }

  isShowPassword: boolean = true
  showPassword() {
    this.isShowPassword = !this.isShowPassword
  }
  ngOnInit(): void {
    this.formInit()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
