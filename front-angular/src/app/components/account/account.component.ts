import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import 'lodash';
declare var _:any;

type Person = {
    id: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    roles: string;
}
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  editUser: FormGroup;
  currentUser: Person;
  originalUser: Person;
  edit: any = {
    email: false,
    password: false,
    firstname: false,
    lastname: false,
    phone: false,
    roles: false,
  };
  isAdmin: boolean = false;
  @Input() haveChanged: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    // changes.prop contains the old and the new value...
  }
  constructor(
    public userForm: FormBuilder,
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private usersService: UserService
  ) {
    this.originalUser = this.initUser();
    this.currentUser = this.initUser();
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
  initUser(){
    return {
      id : "",
      password : "",
      phone : "",
      firstName : "",
      lastName : "",
      email : "",
      roles: "",
    }
  }
  setEdit(path: any){
    this.edit[path] = !this.edit[path]
    return this.edit[path];
  }
  userHaveChanged(){
    console.log(_.isEqual(this.currentUser, this.originalUser))
    this.haveChanged = _.isEqual(this.currentUser, this.originalUser);
    return;
  }
  registerUser(id: string) {
    const user = this.editUser.value;
    Object.keys(user).forEach(key => {
      if(!user[key] || user[key] === ""){
        delete user[key];
      }
    });
    this.usersService.updateUser(id, user).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.status === 200) {
          this.authService.notify("success", res.message)
        }
      },
      error: () => {
        this.authService.notify("error", "Une erreur est survenue")
      }
    })
    console.log(user)
    /*this.usersService.getUser(id).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.status === 200) {
          this.authService.notify("success", res.message)
        }
      },
      error: () => {
        this.authService.notify("error", "Une erreur est survenue")
      }
    });*/
  }

  logout() {
    this.authService.doLogout();
  }

  async ngOnInit(): Promise<void> {
    let user: any = await localStorage.getItem('user');
    user = JSON.parse(user);
    this.authService.getUserProfile(user.id).subscribe(res => {
      if(res !== undefined){
        let roleArr = res.Roles;
        roleArr = roleArr.join(' ')
        const id: string = res._id;
        const phone: string = res.Phone;
        const firstName: string = res.FirstName;
        const lastName: string = res.Lastname;
        const email: string = res.Email;
        const roles: string = roleArr;
        this.isAdmin = roles.includes("ROLE_ADMIN")
        this.originalUser = { id, password: '', phone, firstName, lastName, email, roles,};
        this.currentUser= { id, password: '', phone, firstName, lastName, email, roles,};
      }
    });
  }

}
