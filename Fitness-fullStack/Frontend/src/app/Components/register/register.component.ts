import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [FormsModule, CommonModule ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    form: any = {
    username: '',
    email: '',
    password: ''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }
  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authservice.register(username, email, password).subscribe(
      response => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/home']);
      },
      error => {
        this.errorMessage = error.error.message || 'An error occurred during registration.';
        console.log(error);
        this.isSignUpFailed = true;
      }
    );
  }
}
