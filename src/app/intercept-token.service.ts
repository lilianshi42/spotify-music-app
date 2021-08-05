import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptTokenService implements HttpInterceptor {
  // Initialization
  constructor(private as: AuthService) {}

  // Methods
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('spotify.com')) {
      // Clone the existing request, and add the authorization header
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${this.as.getToken()}`,
        },
      });
    }
    // Pass the request on to the next handler
    return next.handle(request);
  }
}
