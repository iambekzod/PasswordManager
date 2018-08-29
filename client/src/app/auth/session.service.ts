import { Injectable } from '@angular/core';
import { LoginResponse } from '../login/loginResponse';

@Injectable()
export class SessionService {

  constructor() { }

  get loginSessionObj(): LoginResponse {
    try {
      return JSON.parse(this.loginSession);
    } catch (e) {
      this.destroy();
      return null;
    }
  }

  get loginSession(): string {
    return window.localStorage.getItem('loginSession');
  }

  set loginSession(loginResponse: string) {
    window.localStorage.setItem('loginSession', loginResponse);
  }

  public destroy(): void {
    window.localStorage.removeItem('loginSession');
  }
}