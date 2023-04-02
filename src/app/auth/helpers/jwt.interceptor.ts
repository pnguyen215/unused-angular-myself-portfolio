import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthenticationService } from "app/auth/service";
import { Router } from "@angular/router";
import { Logger, NgxAuthorizationService } from "ngx-api-sdk";
import { LineSys } from "app/model/routes/line-sys.route";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  protected logger = new Logger(JwtInterceptor.name);

  /**
   *
   * @param {AuthenticationService} _authService
   * @param {NgxAuthorizationService} _ngxAuthHelper
   * @param {Router} _router
   */
  constructor(
    private _authService: AuthenticationService,
    private _ngxAuthHelper: NgxAuthorizationService,
    private _router: Router
  ) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isAvailable = this._authService.isAvailable();
    const token = this._authService.getTokenAuthorized();
    const isExpired: boolean =
      this._ngxAuthHelper.isVerifyTokenExpiredWith(token);
    const allow: boolean = this._authService.hasAuthorized() && !isExpired;

    if (!isAvailable) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this._authService.getFakeAccessToken()}`,
        },
      });
      return next.handle(request);
    }

    if (allow) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    if (isExpired) {
      this._authService.logout();
      this._router.navigate([`${LineSys.path.path_login}`], {
        queryParams: {},
      });
    }

    return next.handle(request);
  }
}
