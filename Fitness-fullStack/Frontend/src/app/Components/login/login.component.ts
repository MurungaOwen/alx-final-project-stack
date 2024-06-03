import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  imports: [FormsModule, CommonModule ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: '',
    password: ''
  };
  isLoggedIn = false;
  loginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email, password } = this.form;

    if (!email || !password) {
      this.loginFailed = false;
      this.errorMessage = 'Please enter both email and password.';
      return; // Exit the function early if fields are missing
    }
  

    this.authService.login(email, password).subscribe(
      response => {this.tokenStorage.setUserId(response.user_id)
        this.tokenStorage.saveToken(response.token);
        this.tokenStorage.saveUser(response.user);
        this.isLoggedIn = true;
        this.loginFailed = false;
        alert(response.message);
        this.router.navigate(['/home']);
      },
      error => {
        if (error && error.error && error.error.error) {
          switch (error.error.error) {
            case 'User does not exist':
              this.errorMessage = 'User not found. Please check your email.';
              break;
            case 'Incorrect password':
              this.errorMessage = 'Incorrect password. Please try again.';
              break;
            default:
              this.errorMessage = 'An error occurred. Please try again later.';
              break;
          }
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        this.loginFailed = true;
      }
    );
  }
  onCreateAccount(): void {
    this.router.navigate(['/register']);
  }
}
