import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";

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
  edit: any = {
    email: false,
    password: false,
    firstname: false,
    lastname: false,
    phone: false,
    roles: false,
  };
  isAdmin: boolean = false;
  constructor(
    public userForm: FormBuilder,
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private usersService: UserService
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
    this.currentUser = {
      id : "",
      password : "",
      phone : "",
      firstName : "",
      lastName : "",
      email : "",
      roles: "",
    };
  }

  setEdit(path: any){
    this.edit[path] = !this.edit[path]
    return this.edit[path];
  }

  registerUser(id: string) {
    console.log("click")
    this.usersService.getUser(id).subscribe({
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
        const lastName: string = res.LastName;
        const email: string = res.Email;
        const roles: string = roleArr;
        this.isAdmin = roles.includes("ROLE_ADMIN")
        this.currentUser= {
          id,
          password: '',
          phone,
          firstName,
          lastName,
          email,
          roles,
        };
      }
    });
  }

}
