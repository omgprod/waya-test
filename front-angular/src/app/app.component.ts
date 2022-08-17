import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./shared/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  users:any;
  title = 'front-angular';
  constructor(
    public router:Router,
    public authService: AuthService,) {
  }
  ngOnInit() {
/*    this.http.get('https://localhost:4443/api/users').subscribe((data) => {
      this.users = data;
      console.log(data)
    });*/
/*    this.service.getUsers()
      .subscribe(response => {
        this.users = response;
      });*/
  }
  navigateToLoginForm(){
    this.router.navigate(['se-connecter']).then(r => console.log(r))
  }
  navigateToRegisterForm(){
    this.router.navigate(['nouveau-compte']).then(r => console.log(r))
  }
  logout() {
    this.authService.doLogout();
  }
}
