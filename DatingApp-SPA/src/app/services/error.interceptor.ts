import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { InstantiateExpr } from '@angular/compiler';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.stats === 401) {
          return throwError(error.title);
        }
        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get('Applicatin-Error');
          if (applicationError) {
            return throwError(applicationError);
          }
        }
        const serverError = error.error;
        let modelStateErrors = '';
        if (serverError.errors && typeof serverError.errors === 'object') {
          for (const key in serverError.errors) {
            if (serverError.errors[key]) {
              modelStateErrors += serverError.errors[key] + '\n';
            }
          }
        }
        return throwError(modelStateErrors || serverError || 'Server Error');
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
