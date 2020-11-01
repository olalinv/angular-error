import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ErrorDialogService } from '../../shared/errors/error-dialog.service';
import { LoadingDialogService } from '../../shared/loading/loading-dialog.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorDialogService: ErrorDialogService,
    private loadingDialogService: LoadingDialogService
  ) {}

  // Server-side error (AJAX errors, user errors, back-end code errors, database errors, file system errors)
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingDialogService.openDialog();
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error from HttpErrorInterceptor', error);
        this.errorDialogService.openDialog(
          error.message ?? JSON.stringify(error),
          error.status
        );
        return throwError(error);
      }),
      finalize(() => {
        this.loadingDialogService.hideDialog();
      })
    ) as Observable<HttpEvent<any>>;
  }
}
