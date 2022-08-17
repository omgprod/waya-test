import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, map, Observable, throwError} from "rxjs";

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
  constructor(private http: HttpClient, public router: Router) {
  }
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  signIn(email: String, password: String) {
    console.log(email, password)
    return this.http
      .post<any>(`${this.endpoint}/login_check`, { email, password })
      .subscribe((res: any) => {
        console.log(res.token)
        localStorage.setItem('access_token', res.payload.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUser = res.user;
        this.getUserProfile(res.user.id).subscribe((res) => {
          console.log(res)
        });
        this.router.navigate(['mon-compte']);
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    console.log(authToken)
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
