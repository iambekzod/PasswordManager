import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {

  constructor(
    private sessionService: SessionService
  ) {}

  public isSignedIn() {
    return !!this.sessionService.accessToken;
  }

  public doSignOut() {
    this.sessionService.destroy();
  }

  public doSignIn(accessToken: string, name: string) {
    if ((!accessToken) || (!name)) {
      return;
    }

    this.sessionService.accessToken = accessToken;
    this.sessionService.name = name;
  }

}