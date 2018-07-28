import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Password } from './_password';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = environment.API_URL;
console.log(API_URL);

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

   // API: GET /Passwords
  public getAllPasswords() {
    return this.http.get(API_URL + '/passwords');
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