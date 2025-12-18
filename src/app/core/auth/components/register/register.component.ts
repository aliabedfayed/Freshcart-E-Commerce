import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ValidationMessagesComponent } from "../../../../shared/components/validation-messages/validation-messages.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../../../shared/helpers/password-match';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ValidationMessagesComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading: boolean = true
  resMsg: string = ""
  authForm!: FormGroup
  subscription: Subscription = new Subscription()

  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)

  formInit() {
    this.authForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
    }, { validators: passwordMatchValidator })
  }

  submitForm() {
    this.isLoading = false
    if (this.authForm.valid || !this.isLoading) {
      console.log(this.authForm.value);

      this.subscription = this.authService.register(this.authForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = true
          if (res.message == 'success') {
            this.router.navigate(['/login'])
          }
        },
        error: (error) => {
          console.log(error);
          this.resMsg = error.error.message
          this.isLoading = true
        }
      })
    }
  }

  ngOnInit(): void {
    this.formInit()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
