import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

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

  public doSignIn(accessToken: string, name: string) {
    if ((!accessToken) || (!name)) {
      return;
    }

    this.sessionService.loginSession = JSON.stringify({
      token: accessToken,
      name: name
    });
  }

}