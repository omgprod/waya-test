import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    public userForm: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {

    this.signupForm = this.userForm.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      password: [''],
    });
  }
  ngOnInit(): void {
  }
  navigateToLoginForm(){
    this.router.navigate(['se-connecter']);
  }
  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.authService.notify("success", res.message)
          this.signupForm.reset();
          this.router.navigate(['se-connecter']);
        } else {
          this.authService.notify("error", res.message)
        }
    },
    error: (res) => {
        this.authService.notify("error", "Une erreur est survenue")
      }
    });
  }
}
