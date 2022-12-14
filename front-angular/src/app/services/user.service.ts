import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, map, Observable, throwError} from "rxjs";
import { HotToastService } from '@ngneat/hot-toast';
import {AuthService} from "../shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://localhost/api/users';
  constructor(
    private toast: HotToastService,
    private http: HttpClient,
    public router: Router,
    private authService: AuthService
  ) { }

  getUsers(): Observable<any> {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }
  getUser(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`).pipe(catchError(this.handleError));
  }
  deleteUser(id: String): Observable<any> {
    return this.http.delete(`${this.url}/${id}`).pipe(catchError(this.handleError));
  }
  updateUser(id: String, body: Object): Observable<any> {
    return this.http.put(`${this.url}/${id}`, body).pipe(catchError(this.handleError));
  }
  postUser(id: String, body: Object): Observable<any> {
    return this.http.post(`${this.url}/${id}`, body).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    console.log(error)
    let msg: string = '';
    if (error.error) {
      if(error.error.status){
        console.log("here11")
        msg = `Error Code: ${error.error.status}\nMessage: ${error.error.detail}`;
      } else {
        console.log("here22")
        if(error.error.message === "Expired JWT Token"){
          // TODO reconnect or refresh token
        }
        msg = `Error Code: ${error.error.code}\nMessage: ${error.error.message}`;
      }
    }
    else {

      console.log("here33")
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
