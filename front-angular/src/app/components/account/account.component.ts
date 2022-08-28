import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
    roles: string[];
}
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  rolesList: string[] = ['ROLE_USER', 'ROLE_ADMIN'];
  editUser: FormGroup;
  currentUser: Person;
  originalUser: Person;
  roles = new FormControl([]);
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
      firstName: [''],
      lastName: [''],
      email: new FormControl(this.currentUser.email, Validators.required),
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
      roles: [""],
    }
  }
  setEdit(path: any){
    this.edit[path] = !this.edit[path]
    return this.edit[path];
  }
  userHaveChanged(){
    this.haveChanged = _.isEqual(this.currentUser, this.originalUser);
    return;
  }
  registerUser(id: string) {
    Object.keys(this.editUser.value).forEach(key => {
      console.log(key,this.editUser.value[key] )
      if(!this.editUser.value[key] || this.editUser.value[key] === ""){
        delete this.editUser.value[key];
      }
    });
    this.usersService.updateUser(id, this.editUser.value).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.fetchInfo(this.currentUser.id);
          this.authService.notify("success", res.message)
        }
      },
      error: () => {
        this.authService.notify("error", "Une erreur est survenue")
      }
    })
  }

  logout() {
    this.authService.doLogout();
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
        this.isAdmin = roles.includes("ROLE_ADMIN")
        this.originalUser = { id, password: '', phone, firstName, lastName, email, roles,};
        this.currentUser= { id, password: '', phone, firstName, lastName, email, roles,};
        this.authService.setUser(this.originalUser)
      }
    });
  }
  removeUser(id: any){
    this.usersService.deleteUser(id).subscribe(res => {
      if(res.status === 200){
        this.authService.notify("success", "utilisateur supprimé");
        this.logout();
      } else {
        this.authService.notify("success", "une erreur est survenue");
      }
    })
  }

  async ngOnInit(): Promise<void> {
    let user: any = await localStorage.getItem('user');
    user = JSON.parse(user);
    this.fetchInfo(user.id);
  }
}
