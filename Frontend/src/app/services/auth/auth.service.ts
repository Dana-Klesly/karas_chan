import { Injectable } from '@angular/core';
import { JWTPayload, User, UserInput,UserLogInInput } from './auth.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUpUser(input: UserInput): Observable<User> {
    return this.http.post<User>('/api/auth/signup', input); 
  }
  
  signInUser(input: UserLogInInput): Observable<JWTPayload> {
    return this.http.post<JWTPayload>('/api/auth/signin', input); 
  }
  
}
