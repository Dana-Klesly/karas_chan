import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../services/storeg/storage.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword: boolean = false;
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.storageService.getItem('Token');
    if (token) {
      this.router.navigate(['/home']);
    }
  }
  onSubmit(): void {
    const user = {
      email: this.username,
      password: this.password,
    };
    console.log(user);
    this.authService.signInUser(user).subscribe(
      (data) => {
        console.log('Login successful:', data);

        if (!data?.data?.accessToken) {
          console.error('Access token not found in response!');
          return;
        }

        const token = data.data.accessToken;
        const decodedToken = this.decodeJWT(token);

        if (!decodedToken?.userId) {
          console.error('User ID not found in token payload!');
          return;
        }

        this.storageService.setItem('Token', token);
        this.storageService.setItem('userId', decodedToken.userId);

        console.log('Stored userId:', decodedToken.userId);

        this.router.navigate(['/home']);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 400) {
          const errors = err.error.errors as {
            path: string;
            message: string;
          }[];
          errors.forEach((error) => alert(error.message));
        } else if (err.status === 401) {
          alert('The E-mail or password is wrong');
        } else if (err.status === 500) {
          alert('Internal server error please try again later!');
        }
      }
    );
  }

  private decodeJWT(token: string): any {
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadDecoded = atob(payloadBase64);
      return JSON.parse(payloadDecoded);
    } catch (e) {
      console.error('Error decoding JWT:', e);
      return null;
    }
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();

    const passwordInput = document.getElementById(
      'password-input'
    ) as HTMLInputElement;
    const target = event.currentTarget as HTMLElement;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      target.classList.add('view');
    } else {
      passwordInput.type = 'password';
      target.classList.remove('view');
    }
  }
}
