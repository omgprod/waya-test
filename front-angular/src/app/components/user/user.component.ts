import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";

type Person = {
  id: string;
  username: string;
  Email: string;
  FirstName: string;
  Lastname: string;
  Phone: string;
  roles: Array<string>;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  editUser: FormGroup;
  currentUser = {};
  isAdmin = false;
  user:any = {};
  constructor(
    public userForm: FormBuilder,
    public route:ActivatedRoute,
    private authService: AuthService,
    public userService:UserService,
  ) {
    this.editUser = this.userForm.group({
      username: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      password: [''],
      roles: [''],
    });
  }
  registerUser(id: string) {
    console.log("click")
    this.userService.getUser(id).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.status === 200) {
          this.authService.notify("success", res.message)
        }
      },
      error: () => {
        this.authService.notify("error", "Une erreur est survenue")
      }
    });
  }
  async ngOnInit() {
    this.currentUser = await this.authService.getUser();
    this.isAdmin = await this.authService.isAdmin()
    const id = this.route.snapshot.paramMap.get('id');
    if(!id){
      // navigate to list
    }
    this.fetchUser(this.route.snapshot.paramMap.get('id'))
  }

  fetchUser(id: any){
    this.userService.getUser(id).subscribe(async (data: any) => {
      this.user = data;
      console.log(data)
    })
  }

}
