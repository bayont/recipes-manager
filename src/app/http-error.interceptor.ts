import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';

export function HttpErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0 || error.status === 400) {
        snackBar.open('CrudCrud API key expired', 'CLOSE');
      }
      throw error;
    })
  );
}
