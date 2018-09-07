import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { LoginResponse } from '../login/loginResponse';

@Injectable()
export class AuthService {

  constructor(
    private sessionService: SessionService
  ) {}

  public isSignedIn() {
    let loginObj = this.sessionService.loginSessionObj;

    if (loginObj) {
      return !!loginObj.token;
    }
    return false;
  }

  public doSignOut() {
    this.sessionService.destroy();
  }

  public doSignIn(responseObj: LoginResponse): boolean {
    if ((!responseObj.token)) {
      return false;
    }

    this.sessionService.loginSession = JSON.stringify(responseObj);
    return true;
  }

}