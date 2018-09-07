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

  public register(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_URL + '/user/signup', user);
  }

  public login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_URL + '/user/signin', user);
  }

  public findPasswords(): Observable<Password[]> {
    let params = new HttpParams().set('id', this.sessionService.loginSessionObj.id);

    return this.http.get<Password[]>(API_URL + '/passwords', {
      params: params,
      headers: this.getRequestHeaders()
    });
  }

  public createPassword(password: Password): Observable<Password> {
    return this.http.post<Password>(API_URL + '/passwords', password, { 
      headers: this.getRequestHeaders()
    });
  }

  public updatePassword(id: string, password: Password): Observable<Password> {
    let params = new HttpParams().set('id', id);

    return this.http.patch<Password>(API_URL + '/passwords', password, {
      params: params,
      headers: this.getRequestHeaders()
    });
  }

  public deletePassword(id: string): Observable<Password> {
    let params = new HttpParams().set('id', id);

    return this.http.delete<Password>(API_URL + '/passwords', {
      params: params,
      headers: this.getRequestHeaders()
    });
  }
}