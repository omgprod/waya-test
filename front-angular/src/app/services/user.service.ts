import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, map, Observable, throwError} from "rxjs";
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://localhost:4443/api/users';
  constructor(
    private toast: HotToastService,
    private http: HttpClient,
    public router: Router
  ) { }

  getUsers(): Observable<any> {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }
  getUser(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`).pipe(catchError(this.handleError));
  }
  updateUser(id: String, body: Object): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, body).pipe(catchError(this.handleError));
  }
  postUser(id: String, body: Object): Observable<any> {
    return this.http.post(`${this.url}/${id}`, body).pipe(catchError(this.handleError));
  }
  deleteUser(id: String, body: Object): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, body).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    console.log(error)
    let msg: string = '';
    if (error.error) {
      if(error.error.status){
        msg = `Error Code: ${error.error.status}\nMessage: ${error.error.detail}`;
      } else {
        msg = `Error Code: ${error.error.code}\nMessage: ${error.error.message}`;
      }
    }
    else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
