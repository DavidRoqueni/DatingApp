import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) {}

  login(model: User) {
    return this.http.post(this.baseurl + 'login', model).pipe(
      map((reponse: any) => {
        const user = reponse;
        if (user) {
          localStorage.setItem('Token', user.token);
        }
      })
    );
  }

  register(model: User) {
    return this.http.post(this.baseurl + 'register', model);
  }
}
