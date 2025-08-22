import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
//import { AuthService } from '../../../Services/auth.service';


@Component({
    selector: 'app-register',
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    //private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid && this.registerForm.touched) {
      // Call the registration service here
      // this.authService.register(this.registerForm.value).subscribe({
      //   next: async () => {
      //     this.toastr.success('Registration successful');
      //     let returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
      //     this.router.navigate([returnUrl]);
      //   },
      //   error: (error) => {
      //     this.toastr.error('Registration failed');
      //     console.error(error);
      //   }
      // });
    }
  }

}
