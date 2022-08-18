import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../shared/auth.service";
import {UserService} from "../../services/user.service";
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';

const paginate = (array: Array<Person>, pageSize: number, pageNumber: number) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}
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
  pageSize = 10;
  pageNumber = 1;
  arrayCount = 1;
  displayedColumns: string[] = ['actions', 'id', 'Email', 'FirstName', 'LastName', 'Phone'];
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  users: Array<Person>;
  usersFetch: Array<Person>;

  constructor(
    public router:Router,
    private http:HttpClient,
    public authService: AuthService,
    private service:UserService) {
    this.users = [];
    this.usersFetch = [];
  }
  paginateTable(){
    this.users = paginate(this.usersFetch, this.pageSize, this.pageNumber);
  }
  ngOnInit(): void {
    // @ts-ignore
    this.http.get('https://localhost:4443/api/users').subscribe((data: Array<Person>) => {
      this.usersFetch = data;
      this.arrayCount = data.length;
      this.users = data;
      this.users = paginate(this.users, this.pageSize, this.pageNumber);
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
