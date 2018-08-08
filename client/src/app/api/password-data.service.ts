import { Injectable } from '@angular/core';
import { Password } from './_password';
import { ApiService } from './api.service';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PasswordDataService {

  constructor(
    private api: ApiService
  ) {
  }

  // // Simulate POST /Passwords
  // addPassword(Password: Password): Observable<Password> {
  //   return this.api.createPassword(Password);
  // }

  // // Simulate DELETE /Passwords/:id
  // deletePasswordById(PasswordId: number): Observable<Password> {
  //   return this.api.deletePasswordById(PasswordId);
  // }

  // // Simulate PUT /Passwords/:id
  // updatePassword(Password: Password): Observable<Password> {
  //   return this.api.updatePassword(Password);
  // }

  // Simulate GET /Passwords
  getAllPasswords() {
    // return this.api.getAllPasswords().subscribe(
    //   data => {
    //     console.log(data);
    //     return data;
    //   },
    //   error => {
    //     this.handleError(error);
    //   }
    // )
  }

  // // Simulate GET /Passwords/filter/:word
  // getAllFilterPasswords(filter: string): Observable<Password[]> {
  //   return this.api.getAllFilterPasswords(filter);
  // }

  // // Simulate GET /Passwords/:id
  // getPasswordById(PasswordId: number): Observable<Password> {
  //   return this.api.getPasswordById(PasswordId);
  // }
}