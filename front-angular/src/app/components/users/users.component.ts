import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../shared/auth.service";
import {UserService} from "../../services/user.service";

type Person = {
  id: string;
  username: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  roles: Array<string>;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Array<Person>;
  constructor(
    public router:Router,
    private http:HttpClient,
    public authService: AuthService,
    private service:UserService) {
    this.users = [];
  }

  ngOnInit(): void {
    // @ts-ignore
    this.http.get('https://localhost:4443/api/users').subscribe((data: Array<Person>) => {
      this.users = data;
      console.log(this.users)
/*      data.forEach((user) =>{
        if(user){
          const id: string = user._id;
          const username: string = user.Username;
          const phone: string = user.Phone;
          const firstName: string = user.FirstName;
          const lastName: string = user.LastName;
          const email: string = user.Email;
          const roles: Array<string> = user.Roles;
          const pers: Person = {
            id,
            username,
            phone,
            firstName,
            lastName,
            email,
            roles,
          };
          this.users.push(pers);
        }*/
      })
  }

}
