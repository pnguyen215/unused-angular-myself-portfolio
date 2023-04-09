import { Inject, Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

import {
  allNotNull,
  NgxRecordsOpsService,
  NgxStoragesService,
  PropsRecordPrototypes,
  PropsRegisterReq,
} from "ngx-api-sdk";
import { API } from "app/model/routes/api.route";
import { AuthClass } from "app/model/class/auth-class.model";
import { UserClass } from "app/model/class/user-class.model";
import { KeyService } from "./key.service";

@Injectable({ providedIn: "root" })
export class AuthenticationService
  extends NgxRecordsOpsService<any>
  implements OnDestroy {
  public currentUser: Observable<UserClass>;
  private currentUserSubject: BehaviorSubject<UserClass>;

  /**
   * @param {HttpClient} _http
   * @param {NgxStoragesService} _storageService
   */
  constructor(
    @Inject(HttpClient) _http,
    private _storageService: NgxStoragesService,
    private _keyService: KeyService
  ) {
    super(_http);
    this.setHost(this._keyService.getHostAA());
    this.currentUserSubject = new BehaviorSubject<UserClass>(
      this.getUserAuthorized()
    );
    this.currentUserSubject.next(this.getUserAuthorized());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * @description - get current user from state
   */
  public get currentUserValue(): UserClass {
    return this.currentUserSubject.value;
  }

  /**
   * @param {PropsRegisterReq} request -
   * @description - call API login
   */
  login(request: PropsRegisterReq): Observable<PropsRecordPrototypes<any>> {
    this.setPrefixApi(`${API.endpoints.userUrl}${API.eSuffix.toSignIn}`);
    return this.onPostAnyRequest(request);
  }

  /**
   * @description - get user detail when user logged in successfully
   */
  self(): Observable<PropsRecordPrototypes<any>> {
    this.setPrefixApi(`${API.endpoints.selfUrl}${API.eSuffix.toInfo}`);
    return this.onGet();
  }

  logout() {
    this._storageService.remove(this.getKeyToken());
    this._storageService.remove(this.getKeyUser());
    this.currentUserSubject.next(null);
  }

  isAvailable(): boolean {
    return this._keyService.isAAAvailable();
  }

  getKeyToken(): string {
    return this._keyService.getAAKeyToken();
  }

  getKeyUser(): string {
    return this._keyService.getAAKeyUser();
  }

  /**
   * @param {AuthClass} auth -
   * @description - save auth body into local storage
   */
  setTokenAuthorized(auth: AuthClass) {
    this._storageService.set(this.getKeyToken(), auth.access_token);
  }

  /**
   * @param {UserClass} user -
   * @description - save user authorized into local storage
   */
  setUserAuthorized(user: UserClass) {
    this._storageService.set(this.getKeyUser(), user);
    this.currentUserSubject.next(user);
  }

  /**
   * @description - get user storage into local before
   */
  getUserAuthorized(): UserClass {
    return this._storageService.get(this.getKeyUser());
  }

  /**
   * @description - get token from local storage
   */
  getTokenAuthorized(): string {
    try {
      return this._storageService.get(this.getKeyToken());
    } catch (e) {
      this.logger.error(e);
      return undefined;
    }
  }

  /**
   * @description - check user already authorized (user must be logged in before)
   */
  hasAuthorized(): boolean {
    return (
      this.getTokenAuthorized() !== undefined &&
      this.getTokenAuthorized() != "" &&
      allNotNull(this.getTokenAuthorized())
    );
  }

  getFakeAccessToken(): string {
    return this._keyService.getAAFakeAccessToken();
  }

  isAllowUseFakeToken(): boolean {
    return this._keyService.isAllowUseFakeToken();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
