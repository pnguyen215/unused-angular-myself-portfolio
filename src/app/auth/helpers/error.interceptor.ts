import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from 'app/auth/service';
import { Logger, PropsRecordPrototypes, toJson } from 'ngx-api-sdk';
import { LineSys } from 'app/model/routes/line-sys.route';
import { ToastrService } from 'ngx-toastr';
import { CoreSys } from 'app/model/messages/core-sys.message';

export interface PropsErrorsDefault extends PropsRecordPrototypes<any> {

  debugMessage?: string;
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  protected logger = new Logger(ErrorInterceptor.name);
  /**
   * @param {Router} _router
   * @param {AuthenticationService} _authService
   * @param {ToastrService} _toastrService
   */
  constructor(
    private _router: Router,
    private _toastrService: ToastrService,
    private _authService: AuthenticationService
  ) { }

  /**
   * @param {HttpRequest} request
   * @param {HttpHandler} next
  */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => this.handleError(error, request, next))
    );
  }

  /**
   * @param {HttpRequest} request
   * @param {HttpHandler} next
   * @param {HttpErrorResponse} error
  */
  private handleError(error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    const prototypeErrors: PropsErrorsDefault = JSON.parse(toJson(error.error));
    this.logger.error('debug message = ', prototypeErrors, '(reason) error = ', error);

    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    if ([401, 403].indexOf(error.status) !== -1) {
      this._router.navigate([`${LineSys.path.path_not_authorized}`]);
    }

    // custom error status 500 here
    if (error.status === 500) {
    }

    this.onAlertError(`${prototypeErrors.message ? prototypeErrors.message : CoreSys.UNABLE_CONNECT_SERVER_MESSAGE}`);
    return throwError(prototypeErrors);
  }

  /**
   * @param {string} message
  */
  onAlertError(message: string) {
    this._toastrService.error(
      message, 'Error',
      { toastClass: 'toast ngx-toastr', closeButton: true }
    );
  }
}
