import { AuthService } from '../auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  get isLoggedIn() {
    return this.authService.isSignedIn();
  }

  public onLogout():void {
    this.authService.doSignOut();
    this.router.navigate(['/']);
  }

  constructor(private authService: AuthService, private router: Router) { }
}