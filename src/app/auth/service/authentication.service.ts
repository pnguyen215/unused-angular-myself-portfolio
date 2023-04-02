import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'environments/environment';
import {
  allNotNull,
  NgxRecordsOpsService,
  NgxStoragesService,
  PropsRecordPrototypes,
  PropsRegisterReq
} from 'ngx-api-sdk';
import { API } from 'app/model/routes/api.route';
import { AuthClass } from 'app/model/class/auth-class.model';
import { UserClass } from 'app/model/class/user-class.model';
import { CoreKeys } from 'app/model/keys/core-keys.key';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends NgxRecordsOpsService<any> implements OnDestroy {

  protected host = environment.host.authorization;
  public currentUser: Observable<UserClass>;
  private currentUserSubject: BehaviorSubject<UserClass>;

  /**
   * @param {HttpClient} _http
   * @param {NgxStoragesService} _storageService
   */
  constructor(
    @Inject(HttpClient) _http,
    private _storageService: NgxStoragesService,
  ) {
    super(_http);
    this.setHost(this.host);
    this.currentUserSubject = new BehaviorSubject<UserClass>(this.getUserAuthorized());
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
    return allNotNull(environment.components?.auth_service?.enabled) && environment.components?.auth_service?.enabled;
  }

  getKeyToken(): string {
    return environment.components.auth_service.storage_key_token ? environment.components.auth_service.storage_key_token :
      CoreKeys.KEY_TOKEN_DEFAULT;
  }

  getKeyUser(): string {
    return environment.components.auth_service.storage_key_user ? environment.components.auth_service.storage_key_user :
      CoreKeys.KEY_USER_DEFAULT;
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
    return this.getTokenAuthorized() !== undefined &&
      this.getTokenAuthorized() != '' &&
      allNotNull(this.getTokenAuthorized());
  }

  getFakeAccessToken(): string {
    return environment.components.auth_service.fake_access_token;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
