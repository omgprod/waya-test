import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, map, Observable, throwError} from "rxjs";
import { HotToastService } from '@ngneat/hot-toast';

export class User {
  _id!: String;
  firstName!: String;
  lastName!: String;
  phone!: String;
  email!: String;
  password!: String;
  roles!: Array<String>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'https://localhost/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: any = {};
  constructor(
    private toast: HotToastService,
    private http: HttpClient,
    public router: Router,
  ) {
  }
  notify(type:string, message: string){
    switch (type) {
      case "loading":
        return this.toast.loading(message);
      case "success":
        return this.toast.success(message);
      case "warning":
        return this.toast.warning(message);
      case "error":
        return this.toast.error(message);
      case "info":
        return this.toast.info(message);
      default:
        return this.toast.show(message);
    }
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
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  signIn(email: String, password: String): Observable<any> {
    let api = `${this.endpoint}/login_check`;
    return this.http.post(api, {email, password}).pipe(catchError(this.handleError));
  }
  async isAdmin(){
    const user: any = await this.getUser();
    return user.roles.includes("ROLE_ADMIN")
  }
  setUser(user:any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    return this.currentUser;
  }
  async getUser() {
    const user: any = await localStorage.getItem('user')
    return JSON.parse(user);
  }
  setToken(token:string) {
    localStorage.setItem('access_token', token);
    return this.currentUser;
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/users/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  doLogout() {
    this.notify("show", "Au revoir");
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    return this.router.navigate(['se-connecter']);
  }
  handleError(error: HttpErrorResponse) {
    let msg: string = '';
    if (error.error) {
      if(error.error.status){
        msg = `Error Code: ${error.error.status}\nMessage: ${error.error.detail}`;
      } else {
        msg = `Error Code: ${error.error?.code}\nMessage: ${error.error?.message}`;
      }
    }
    else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
