import { Injectable } from "@angular/core";
import { CoreKeys } from "app/model/keys/core-keys.key";
import { environment } from "environments/environment";
import { allNotNull } from "ngx-api-sdk";

@Injectable({
  providedIn: "root",
})
export class KeyService {
  constructor() {}

  getHostAA(): string {
    return environment.host.authorization;
  }

  getAAKeyToken(): string {
    return environment.components.auth_service.storage_key_token
      ? environment.components.auth_service.storage_key_token
      : CoreKeys.KEY_TOKEN_DEFAULT;
  }

  getAAKeyUser(): string {
    return environment.components.auth_service.storage_key_user
      ? environment.components.auth_service.storage_key_user
      : CoreKeys.KEY_USER_DEFAULT;
  }

  getAAFakeAccessToken(): string {
    return environment.components.auth_service.fake_access_token;
  }

  isAAAvailable(): boolean {
    return (
      allNotNull(environment.components?.auth_service?.enabled) &&
      environment.components?.auth_service?.enabled
    );
  }

  getConfigNameApplication(): string {
    return environment.attributes.banner.title
      ? environment.attributes.banner.title
      : CoreKeys.KEY_BANNER_TITLE;
  }

  isAllowHideNavbarProfile(): boolean {
    return (
      allNotNull(environment.attributes?.navbar?.allow_hide_profile) &&
      environment.attributes?.navbar?.allow_hide_profile
    );
  }

  isAllowUseAvatarSelfNavbar(): boolean {
    return (
      allNotNull(environment.attributes?.navbar?.allow_use_avatar_self) &&
      environment.attributes?.navbar?.allow_use_avatar_self
    );
  }
}
