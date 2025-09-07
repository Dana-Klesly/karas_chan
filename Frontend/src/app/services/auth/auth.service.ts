import { Injectable } from '@angular/core';
import { JWTPayload, User, UserInput,UserLogInInput } from './auth.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private config: ConfigService, private http: HttpClient) { }

  signUpUser(input: UserInput): Observable<User> {
    return this.http.post<User>(`${this.config.apiBaseUrl}/auth/signup`, input);
  }
  
  signInUser(input: UserLogInInput): Observable<JWTPayload> {
    return this.http.post<JWTPayload>(`${this.config.apiBaseUrl}/auth/signup`, input);
  }
}
