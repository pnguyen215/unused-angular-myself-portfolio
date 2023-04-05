import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';

import { CoreCommonModule } from '@core/common.module';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';

import { NavbarComponent } from 'app/layout/components/navbar/navbar.component';
import { NavbarBookmarkComponent } from 'app/layout/components/navbar/navbar-bookmark/navbar-bookmark.component';
import { NavbarSearchComponent } from 'app/layout/components/navbar/navbar-search/navbar-search.component';

import { NavbarNotificationComponent } from 'app/layout/components/navbar/navbar-notification/navbar-notification.component';
import { NavbarProfileSettingComponent } from './navbar-profile-setting/navbar-profile-setting.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { NavbarAvatarComponent } from './navbar-avatar/navbar-avatar.component';
import { NavbarUserBuilderComponent } from './navbar-user-builder/navbar-user-builder.component';
import { NavbarAvatarBuilderComponent } from './navbar-avatar-builder/navbar-avatar-builder.component';
import { NavbarProfileNativeComponent } from './navbar-profile-native/navbar-profile-native.component';
import { NavbarAvatarDefaultComponent } from './navbar-avatar-default/navbar-avatar-default.component';
import { NavbarAvatarSelfComponent } from './navbar-avatar-self/navbar-avatar-self.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

@NgModule({
  declarations: [
    NavbarComponent,
    NavbarSearchComponent,
    NavbarBookmarkComponent,
    NavbarNotificationComponent,
    NavbarProfileSettingComponent,
    NavbarUserComponent,
    NavbarAvatarComponent,
    NavbarUserBuilderComponent,
    NavbarAvatarBuilderComponent,
    NavbarProfileNativeComponent,
    NavbarAvatarDefaultComponent,
    NavbarAvatarSelfComponent
  ],
  imports: [
    RouterModule,
    NgbModule,
    CoreCommonModule,
    PerfectScrollbarModule,
    CoreTouchspinModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [
    NavbarComponent,
    NavbarAvatarComponent,
    NavbarAvatarBuilderComponent
  ]
})
export class NavbarModule { }
