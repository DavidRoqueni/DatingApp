import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../Models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: {
    nameid: string;
    unique_name: string;
    nbf: number;
    exp: number;
    iat: number;
  };

  constructor(private http: HttpClient) {}

  login(model: User) {
    return this.http.post(this.baseurl + 'login', model).pipe(
      map((reponse: any) => {
        const user = reponse;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  register(model: User) {
    return this.http.post(this.baseurl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem('token');
    return !!localStorage.getItem('token');
  }
}
