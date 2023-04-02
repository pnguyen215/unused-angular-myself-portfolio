import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { AuthenticationService } from "app/auth/service";
import { UserClass } from "app/model/class/user-class.model";
import { LineSys } from "app/model/routes/line-sys.route";
import { Logger, NgxAuthorizationService } from "ngx-api-sdk";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  protected logger = new Logger(AuthGuard.name);
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authService,
   *
   */
  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private _ngxAuthHelper: NgxAuthorizationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAvailable = this._authService.isAvailable();
    const token = this._authService.getTokenAuthorized();
    const isExpired: boolean =
      this._ngxAuthHelper.isVerifyTokenExpiredWith(token);
    const allow: boolean = this._authService.hasAuthorized() && !isExpired;
    const user: UserClass = this._authService.getUserAuthorized();

    if (!isAvailable) {
      return true;
    }

    if (allow) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    // this._router.navigate([`${LineSys.path.path_login}`], { queryParams: { returnUrl: state.url } });
    this._router.navigate([`${LineSys.path.path_not_authorized}`]);
    return false;
  }
}
