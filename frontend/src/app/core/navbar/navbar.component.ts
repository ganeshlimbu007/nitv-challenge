import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCollapsed: boolean;
  loginLogoutText = 'Login';
  sub: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnDestroy() {}

  loginOrOut() {
    this.redirectToLogin();
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  setLoginLogoutText() {
    this.loginLogoutText = 'Login';
  }
}
