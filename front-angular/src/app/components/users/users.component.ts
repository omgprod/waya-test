import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
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
  Lastname: string;
  Phone: string;
  roles: Array<string>;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  @Input() search: string = '';
  pageNumber = 1;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['actions', 'id', 'Email', 'FirstName', 'LastName', 'Phone'];
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  currentUser = {};
  isAdmin = false;
  users: Array<Person>;
  usersFetch: Array<Person>;
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    // changes.prop contains the old and the new value...
  }
  constructor(
    public router:Router,
    private http:HttpClient,
    public authService: AuthService,
    public userService: UserService) {
    this.users = [];
    this.usersFetch = [];
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  paginateTable(){
    this.users = paginate(this.usersFetch, this.pageSize, this.pageNumber);
  }
  handlePageEvent(event: any){
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    return this.paginateTable();
  }
  async searchFilter(data: any){
    console.log(data)
    if(!data.target.value || data.target.value === ""){
      await this.fetchUsers();
    }
    this.users = this.users.filter(item => {
      return item.Email.toLowerCase().includes(data.target.value.toLowerCase());
    });
  }
  removeUser(id: any){
    this.userService.deleteUser(id).subscribe(res => {
      console.log(res)
      this.fetchUsers();
    })
  }
  fetchUsers(){
    this.userService.getUsers().subscribe(async (data: Array<Person>) => {
      this.usersFetch = data;
      this.users = data;
      return this.paginateTable();
    })
  }
  async ngOnInit() {
    this.currentUser = await this.authService.getUser();
    this.isAdmin = await this.authService.isAdmin();
    return this.fetchUsers();
  }
}
