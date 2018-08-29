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
    return this.http.get<Password[]>(API_URL + '/passwords', { 
      headers: this.getRequestHeaders()
    });
  }

  // API: POST /Passwords
  public createPassword(password: Password): Observable<Password> {
    return this.http.post<Password>(API_URL + '/passwords', password, { 
      headers: this.getRequestHeaders()
    });
  }

  // API: PUT /Passwords/:id
  public updatePassword(id: string, password: Password): Observable<Password> {
    let params = new HttpParams().set('id', id);

    return this.http.patch<Password>(API_URL + '/passwords', password, {
      params: params,
      headers: this.getRequestHeaders()
    });
  }

  // DELETE /Passwords/:id
  public deletePassword(id: string): Observable<Password> {
    let params = new HttpParams().set('id', id);

    return this.http.delete<Password>(API_URL + '/passwords', {
      params: params,
      headers: this.getRequestHeaders()
    });
  }
}