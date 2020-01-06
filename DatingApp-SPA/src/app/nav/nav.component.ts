import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: User = { username: '', password: '' };

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      reponse => {
        console.log(reponse);
      },
      error => {
        console.log(error);
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('Token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('Token');
    console.log('logged out');
  }
}
