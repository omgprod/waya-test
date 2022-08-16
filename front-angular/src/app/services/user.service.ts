import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://localhost:4443/api/users';
  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get(this.url, httpOptions);
  }
}
