import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { allNotNull, Logger } from 'ngx-api-sdk';


export interface Base {
  enabled?: boolean;
}

export interface ProfileSetting extends Base {

}

export interface Log extends Base {

}

export interface Hmr extends Base {

}

export interface Banner extends Base {

}

export interface LayoutBuilder extends Base {

}

export interface Attribute {
  profile_and_setting?: ProfileSetting;
}

export interface Env {
  attributes?: Attribute;
}


@Injectable({
  providedIn: 'root'
})
export class EnvService {
  protected logger = new Logger(EnvService.name);

  private prototype: Env
  public env: Env;

  constructor() {
    this.env = Object.assign(environment, this.prototype);
  }

  /**
   * @description - check config for profile and setting panel
  */
  isAvailableProfileAndSetting(): boolean {
    return allNotNull(this.env.attributes?.profile_and_setting?.enabled) && this.env.attributes?.profile_and_setting?.enabled;
  }
}
