import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/features/error/services/error-handler.service.service';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private HandleErrorService:ErrorHandlerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.HandleErrorService.handleError(error) 
        return throwError(error);
      })
    );
  }
}
