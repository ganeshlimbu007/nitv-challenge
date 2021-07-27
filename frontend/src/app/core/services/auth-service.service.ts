import { Injectable, Output, EventEmitter } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  authUrl = 'http://localhost:3000/api/signin';

  isAuthenticated = false;
  redirectUrl: string;
  constructor(private http: HttpClient) {}

  private userAuthChanged(status: boolean) {
    this.authChanged.emit(status); // Raise changed event
  }

  login(user): Observable<any> {
    let body = JSON.stringify(user);
    return this.http.post<any>(this.authUrl, body, HttpOptions).pipe(
      map((response) => {
        const { token, message, isLoggedIn } = response;
        this.isAuthenticated = isLoggedIn;
        this.userAuthChanged(isLoggedIn);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.setItem('token', '');
    this.isAuthenticated = false;
    this.userAuthChanged(false);
  }

  isAlreadyLoggedIn() {
    this.isAuthenticated = true;
    this.userAuthChanged(true);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Server error');
  }
}
