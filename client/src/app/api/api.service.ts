import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { LoginResponse } from '../login/loginResponse';
import { Password } from './_password';
import { User } from '../auth/user';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SessionService } from '../auth/session.service';

const API_URL = environment.API_URL;
console.log('Url: ' + API_URL);

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  private getRequestHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.sessionService.loginSessionObj.token });
  }

  public login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_URL + '/user/signin', user);
  }

   // API: GET /Passwords
  public findPasswords(): Observable<Password[]> {
    let params = new HttpParams().set('id', this.sessionService.loginSessionObj.name);

    return this.http.get<Password[]>(API_URL + '/passwords', { 
      params: params, 
      headers: this.getRequestHeaders()
    });
  }

  // API: POST /Passwords
  public createPassword(password: Password): Observable<Password> {
    return this.http.post<Password>(API_URL + '/passwords', password, { 
      headers: this.getRequestHeaders()
    });
  }

  // // API: PUT /Passwords/:id
  // public updatePassword(password: Password): Observable<Password> {
  //   return this.http
  //     .put(API_URL + '/passwords/' + password.id, Password)
  //     .map(response => {
  //       return new Password(response.json());
  //     })
  //     .catch(this.handleError);
  // }

  // // DELETE /Passwords/:id
  // public deletePasswordById(passId: number): Observable<null> {
  //   return this.http
  //     .delete(API_URL + '/Passwords/' + passId)
  //     .map(response => null)
  //     .catch(this.handleError);
  // }
}