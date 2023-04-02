import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { CoreTranslationService } from '@core/services/translation.service';
import { CoreKeys } from 'app/model/keys/core-keys.key';
import { Logger } from 'ngx-api-sdk';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit, OnDestroy {
  protected logger = new Logger(ProfileSettingComponent.name);

  private _unsubscribeAll: Subject<any>;
  coreConfig: any;

  // key value selected
  KEY_NO_PROFILE_VISIBILITY_DEFAULT = CoreKeys.KEY_NO_PROFILE_VISIBILITY_DEFAULT;
  KEY_NO_EMAIL_DEFAULT = CoreKeys.KEY_NO_EMAIL_DEFAULT;
  KEY_NO_SECURITY_DEFAULT = CoreKeys.KEY_NO_SECURITY_DEFAULT;
  KEY_NO_ACCOUNT_REFS_DEFAULT = CoreKeys.KEY_NO_ACCOUNT_REFS_DEFAULT;
  KEY_NO_LINK_REFS_DEFAULT = CoreKeys.KEY_NO_LINK_REFS_DEFAULT;

  // params effect
  id: number = this.KEY_NO_PROFILE_VISIBILITY_DEFAULT;


  /**
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreTranslationService} _coreTranslationService
   * @param {CoreSidebarService} _coreSidebarService
  */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _coreSidebarService: CoreSidebarService,
    private _coreTranslationService: CoreTranslationService
  ) {
    this._unsubscribeAll = new Subject();
    this.onConfig();
  }

  /**
   * @description - config layout login
  */
  onConfig() {
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: false
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: true
      }
    };
  }

  /**
   * @description - subscribe to config changes
  */
  onConfigChanges() {
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  ngOnInit(): void {
    this.onConfigChanges();
  }

  /**
   * @description - unsubscribe from all subscriptions
  */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * @param {number} id
  */
  onSelected(id: number) {
    this.id = id;
  }
}
