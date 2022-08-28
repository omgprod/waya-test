import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

type Person = {
  id: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  roles: Array<string>;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  roles = new FormControl('');
  rolesList: string[] = ['ROLE_USER', 'ROLE_ADMIN'];
  editUser: FormGroup;
  currentUser = {};
  isAdmin = false;
  user:Person;
  constructor(
    public userForm: FormBuilder,
    public route:ActivatedRoute,
    public router: Router,
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
    this.user = this.initUser();
  }
  initUser(){
    return {
      id: "",
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      roles: [""],
    }
  }
  registerUser(id: string) {
    Object.keys(this.editUser.value).forEach(key => {
      if(!this.editUser.value[key] || this.editUser.value[key] === ""){
        delete this.editUser.value[key];
      }
    });
    this.userService.updateUser(id, this.editUser.value).subscribe({
      next: (res: any) => {
        if (res.id) {
          this.fetchInfo(res.id);
          this.authService.notify("success", "Utilisateur modifié");
          return this.router.navigate(['utilisateurs']);
        }
        return this.authService.notify("error", "Une erreur est survenue");
      },
      error: () => {
        this.authService.notify("error", "Une erreur est survenue")
      }
    })
  }
  async ngOnInit() {
    this.currentUser = await this.authService.getUser();
    this.isAdmin = await this.authService.isAdmin();
    const id = this.route.snapshot.paramMap.get('id');
    if(!id){
      // navigate to list
    }
    this.fetchInfo(this.route.snapshot.paramMap.get('id'))
  }

  removeUser(id: any){
    this.userService.deleteUser(id).subscribe(res => {
      if(res.status === 200){
        this.authService.notify("success", "utilisateur supprimé");
        return this.router.navigate(['utilisateurs']);
      } else {
        return this.authService.notify("success", "une erreur est survenue");
      }
    })
  }
  fetchInfo(id: any){
    this.authService.getUserProfile(id).subscribe(res => {
      if(res !== undefined){
        let roleArr = res.Roles;
        roleArr = roleArr.join(' ')
        const id: string = res._id;
        const phone: string = res.Phone;
        const firstName: string = res.FirstName;
        const lastName: string = res.Lastname;
        const email: string = res.Email;
        const roles: string[] = roleArr;
        this.user = { id, password: '', phone, firstName, lastName, email, roles,};
      }
    });
  }

}
