import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  get accessToken(): string { 
    return window.localStorage.getItem('token');
  };

  set accessToken(token: string) {
    window.localStorage.setItem('token', token);
  };


  get name(): string { 
    return window.localStorage.getItem('name');
  };

  set name(name) { 
    window.localStorage.setItem('name', name);
  };

  constructor() { }

  public destroy(): void {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('name');
  }
}