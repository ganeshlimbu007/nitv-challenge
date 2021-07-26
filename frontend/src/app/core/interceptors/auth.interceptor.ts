import { Injectable } from '@angular/core'; // imports the class that provides local storage for token
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token: string = localStorage.getItem('token');
    const tokenBearer: string = `Bearer ${token}`;
    const authReq = request.clone({
      headers: request.headers.set('Authorization', tokenBearer),
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Catching Error Stage
        if (error && error.status === 401) {
          console.log('ERROR 401 UNAUTHORIZED'); // in case of an error response the error message is displayed
        }
        const err = error.error.message || error.statusText;
        return throwError(error); // any further errors are returned to frontend
      })
    );
  }
}
