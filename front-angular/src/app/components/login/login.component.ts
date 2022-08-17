import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../../shared/auth.service';
import {FormBuilder, FormGroup} from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public router:Router,
    public userForm: FormBuilder,
    public authService: AuthService,
  ) {
    this.loginForm = this.userForm.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
  }
  loginUser() {
    const user = this.loginForm.controls
    return this.authService.signIn(user['email'].value, user['password'].value);
  }
  navigateToRegisterForm(){
    this.router.navigate(['nouveau-compte']).then(r => console.log(r))
  }
}
