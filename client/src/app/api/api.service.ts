import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

import { Password } from './_password';
import { User } from '../auth/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../auth/session.service';

const API_URL = environment.API_URL;
console.log(API_URL);

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    //this.options = this.getRequestOptions();
  }

  // private getRequestOptions() {
  //   return new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + this.sessionService.accessToken);
  // }

  public login(user: User) {
    return this.http.post(API_URL + '/user/signin', user);
  }

   // API: GET /Passwords
  public getAllPasswords() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.sessionService.accessToken });
  let options = { headers: headers };

    return this.http.get(API_URL + '/passwords/' + this.sessionService.name, options);
  }

  //   // API: GET /Passwords/filter/:id
  // public getAllFilterPasswords(filter: string): Observable<Password[]> {
  //   return this.http
  //     .get(API_URL + '/passwords/filter/' + filter)
  //     .map(response => {
  //       const passwords = response.json();
  //       return passwords.map((password) => new Password(password));
  //     })
  //     .catch(this.handleError);
  // }

  // public getPasswordById(passId: number): Observable<Password> {
  //   return this.http
  //     .get(API_URL + '/passwords/' + passId)
  //     .map(response => {
  //       return new Password(response.json());
  //     })
  //     .catch(this.handleError);
  // }

  // // API: POST /Passwords
  // public createPassword(password: Password): Observable<Password> {
  //   return this.http
  //     .post(API_URL + '/passwords', Password)
  //     .map(response => {
  //       return new Password(response.json());
  //     })
  //     .catch(this.handleError);
  // }

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