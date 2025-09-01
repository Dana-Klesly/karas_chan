import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  fullName = '';
  address = '';
  email = '';
  password = '';
  


  constructor(private authService: AuthService,private router: Router) {}

  onSubmit(): void {
    const user = {
      fullName: this.fullName,
      address: this.address,
      email: this.email,
      password: this.password,
    };
    console.log(user);
    this.authService.signUpUser(user).subscribe(
      (data) =>this.router.navigate(['/login']) ,
      (err: HttpErrorResponse) => {
        // 400 input error
        // 409 user exists (i.e conflict)
        if (err.status == 400) {
          const errors = err.error.errors as {
            path: string;
            message: string;
          }[];

          errors.forEach((error) => {
            alert(error.message);
          });
        }
        else if  (err.status == 409){
        alert ("This E-mail is already Exists")
        }
      },
    );
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
      // Hide password
      passwordInput.type = 'password';
      target.classList.remove('view');
    }
  }
}

