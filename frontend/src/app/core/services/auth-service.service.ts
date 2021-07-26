import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  baseUrl = 'localhost:3000';
  authUrl = this.baseUrl + '/api/auth';

  isAuthenticated = false;
  redirectUrl: string;

  constructor(private http: HttpClient) {}

  private userAuthChanged(status: boolean) {
    this.authChanged.emit(status); // Raise changed event
  }

  login(user): any {
   return this.http.post<any>(this.baseUrl, user);
  }

  logout() {
    this.userAuthChanged(false);
  }
}
