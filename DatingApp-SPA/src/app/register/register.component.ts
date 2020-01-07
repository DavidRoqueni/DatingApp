import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../Models/User';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  model: User = { username: '', password: '' };

  constructor(private auth: AuthService, private alert: AlertifyService) {}

  ngOnInit() {}

  register() {
    this.auth.register(this.model).subscribe(
      () => {
        this.alert.success('registration success');
      },
      error => {
        this.alert.error(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
