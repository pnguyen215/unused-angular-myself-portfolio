import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ResumeClass } from 'app/model/class/resume-class.model';
import { NgxRecordsOpsService, PropsRecordPrototypes } from 'ngx-api-sdk';
import { KeyService } from './key.service';
import { API } from 'app/model/routes/api.route';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService extends NgxRecordsOpsService<ResumeClass> implements OnDestroy {

  /**
   * @param {HttpClient} _http
   * @param {KeyService} _keyService
  */
  constructor(
    @Inject(HttpClient) _http,
    private _keyService: KeyService
  ) {
    super(_http);
    this.setHost(this._keyService.getHostResume());
  }

  /**
     * @description - get user detail when user logged in successfully
     */
  getResume(): Observable<PropsRecordPrototypes<ResumeClass>> {
    this.setPrefixApi(`${API.endpoints.githubResumeUrl}`);
    return this.onGet();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
