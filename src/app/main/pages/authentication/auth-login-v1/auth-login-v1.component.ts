import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {
  catchError,
  delay,
  finalize,
  first,
  takeUntil,
  tap,
} from "rxjs/operators";
import { Observable, Subject, Subscription, throwError } from "rxjs";

import { CoreConfigService } from "@core/services/config.service";
import { Logger, NgxAuthorizationService, PropsRegisterReq } from "ngx-api-sdk";
import { ActivatedRoute, Router } from "@angular/router";
import { LineSys } from "app/model/routes/line-sys.route";
import { AuthenticationService } from "app/auth/service";
import { CatchErrors } from "app/util/catch-errors.util";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthClass } from "app/model/class/auth-class.model";
import { UserClass } from "app/model/class/user-class.model";

@Component({
  selector: "app-auth-login-v1",
  templateUrl: "./auth-login-v1.component.html",
  styleUrls: ["./auth-login-v1.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AuthLoginV1Component implements OnInit {
  protected logger = new Logger(AuthLoginV1Component.name);
  protected unsubscribe: Subscription[] = [];
  private _unsubscribeAll: Subject<any>;

  coreConfig: any;
  returnUrl: string;
  loginForm: FormGroup;
  passwordTextType: boolean;
  isLoading$: Observable<boolean>;
  visitRequest: PropsRegisterReq;
  isLoading = false;
  submitted = false;
  error = "";

  /**
   * Constructor
   *
   * @param {NgxAuthorizationService} _ngxAuthService
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   * @param {AuthService} _authService
   * @param {ActivatedRoute} _route
   * @param {Router} router
   */
  constructor(
    public _ngxAuthService: NgxAuthorizationService,
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _authService: AuthenticationService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this._authService.isLoading$;
    this._unsubscribeAll = new Subject();
    this.onConfig();
    this.onAuth();
  }

  /**
   * @description - config layout login
   */
  onConfig() {
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
  }

  /**
   * @description - check user already logged in before, if user unauthorized then redirect to login page
   *
   */
  onAuth() {
    const isAvailable = this._authService.isAvailable();

    if (!isAvailable) {
      this.router.navigate([`${LineSys.lines.line_home}`]);
      return;
    }

    const isAuthenticated = this._authService.hasAuthorized();
    if (isAvailable && isAuthenticated) {
      this.router.navigate([`${LineSys.lines.line_home}`]);
    } else {
      this.router.navigate([`${LineSys.path.path_login}`]);
    }
  }

  /**
   * @description - build group from
   *
   */
  onForm() {
    this.loginForm = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  /**
   * @description - convenience getter for easy access to form fields
   * */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * @description - toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * @description - submit login to server by call API
   */
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.submitted = true;
    this.isLoading = true;
    this.error = "";

    this.visitRequest = {
      ...this.visitRequest,
      username: this.f.email.value,
      password: this.f.password.value,
    };

    const isLoggedIn = this._authService
      .login(this.visitRequest)
      .pipe(
        first(),
        delay(1000),
        tap(() => {}),
        catchError((error) => {
          this.error = CatchErrors.onErrorsLoggedIn(error);
          return throwError(error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (response) => {
          if (response.header.code === 200) {
            const auth: AuthClass = new AuthClass(response.items);
            this._authService.setTokenAuthorized(auth);

            this.onUserSnapshot();

            this.router.navigate([this.returnUrl], {
              queryParams: {},
            });
          } else {
            this.error = response.message;
          }
        },
        (error: HttpErrorResponse) => {
          this.error = CatchErrors.onErrorShorten(error);
        }
      );

    this.unsubscribe.push(isLoggedIn);
  }

  /**
   * @description - get user info when user authorized successfully
   */
  onUserSnapshot() {
    this._authService.self().subscribe(
      (self) => {
        if (self.header.code === 200) {
          const user: UserClass = new UserClass(self.items);
          this._authService.setUserAuthorized(user);
        } else {
          this.error = self.message;
          this.loginForm.reset(
            { email: null, password: null },
            { onlySelf: true, emitEvent: true }
          );
        }
      },
      (error) => {
        this.error = CatchErrors.onErrorsLoggedIn(error);
        location.reload();
      }
    );
  }

  /**
   * @description - get return url from route parameters or default to '/'
   *
   */
  onSnapshot() {
    this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/";
  }

  /**
   * @description - subscribe to config changes
   */
  onConfigChanges() {
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });
  }

  ngOnInit(): void {
    this.onForm();
    this.onSnapshot();
    this.onConfigChanges();
  }

  /**
   * @description - unsubscribe from all subscriptions
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
