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
  endpoint: string = 'https://localhost:4443/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
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
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  signIn(email: String, password: String) {
    console.log(email, password)
    try {
      return this.http
        .post<any>(`${this.endpoint}/login_check`, { email, password })
        .subscribe((res: any) => {
          console.log(res)
          console.log(res)
          console.log(res)
          try {
            localStorage.setItem('access_token', res.payload.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('user', JSON.stringify(res.user));
            this.currentUser = res.user;
            this.router.navigate(['mon-compte']);
            return this.notify("success", "Vous êtes connecté")
          }
          catch (e) {
            return this.notify("error", "Une erreur est survenue")
          }
        });
    } catch (e) {
      return this.notify("error", "Une erreur est survenue")
    }
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    //console.log(authToken)
    return authToken !== null;
  }
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/users/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  doLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    return this.router.navigate(['se-connecter']);
  }
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
