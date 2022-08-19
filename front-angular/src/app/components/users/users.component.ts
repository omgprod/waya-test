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
  currentUser = {};
  isAdmin = false;
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
  ngOnInit() {
    // @ts-ignore
    this.http.get('https://localhost:4443/api/users').subscribe(async (data: Array<Person>) => {
      let user: any = await this.authService.getUser();
      this.isAdmin = await this.authService.isAdmin()
      console.log(this.authService.isAdmin())
      this.currentUser = user;
      this.usersFetch = data;
      this.arrayCount = data.length;
      this.users = data;
      this.users = paginate(this.users, this.pageSize, this.pageNumber);
      console.log(this.users)
      })
  }

}
