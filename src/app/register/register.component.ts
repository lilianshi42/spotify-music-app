import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = { userName: '', password: '', password2: '' };
  warning: any;
  success: boolean = false;
  loading: boolean = false;

  constructor(private as: AuthService) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm): void {
    if (
      this.registerUser.userName &&
      this.registerUser.password &&
      this.registerUser.password2
    ) {
      if (this.registerUser.password === this.registerUser.password2) {
        this.loading = true;
        this.as.register(this.registerUser).subscribe(
          (success) => {
            this.success = true;
            this.warning = null;
            this.loading = false;
          },
          (err) => {
            this.success = false;
            this.warning = err.error.message;
            this.loading = false;
          }
        );
      } else {
        this.warning = 'Password does not match!';
      }
    }
  }
}
