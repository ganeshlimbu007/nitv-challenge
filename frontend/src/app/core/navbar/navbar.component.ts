import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCollapsed: boolean;
  loginLogoutText = 'Login';
  sub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token) {
     this.authService.isAlreadyLoggedIn();
     this.setLoginLogoutText()
    }
    this.sub = this.authService.authChanged.subscribe((response: any) => {
      this.setLoginLogoutText();
      return;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loginOrOut() {
    const isAuthenticated = this.authService.isAuthenticated;

    if (isAuthenticated) {
      this.authService.logout();
      this.setLoginLogoutText();
      this.redirectToUsers();
      return;
    } else {
      this.redirectToLogin();
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToUsers() {
    this.router.navigate(['/users']);
  }

  setLoginLogoutText() {
    this.loginLogoutText = this.authService.isAuthenticated ? 'Logout' : 'Login';
  }
}
