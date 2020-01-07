import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../Models/User';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: User = { username: '', password: '' };

  constructor(
    private router: Router,
    public authService: AuthService,
    private alert: AlertifyService
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      reponse => {
        this.alert.success('Logged In Succesfully');
      },
      error => {
        this.alert.error(error);
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    if (!this.authService.logOut()) {
      this.alert.success('Logged Out');
      this.router.navigate(['']);
    } else {
      this.alert.error('Unable to succesfully log out');
    }
  }
}
