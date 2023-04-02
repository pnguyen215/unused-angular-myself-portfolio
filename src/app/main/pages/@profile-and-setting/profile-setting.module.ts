import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreCommonModule } from '@core/common.module';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingComponent } from './profile-setting.component';
import { ManageProfileComponent } from './@manage-profile/manage-profile.component';
import { AuthGuard } from 'app/auth/helpers';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { SettingSidebarComponent } from './@setting-sidebar/setting-sidebar.component';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { FormsModule } from '@angular/forms';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { CoreSidebarModule } from '@core/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { ProfileVisibilityComponent } from './@profile-visibility/profile-visibility.component';
import { ProfileEmailComponent } from './@profile-email/profile-email.component';
import { ProfilePhotoHeaderComponent } from './@profile-photo-header/profile-photo-header.component';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { BlockUIModule } from 'ng-block-ui';
import { ProfileAboutYouComponent } from './@profile-about-you/profile-about-you.component';
import { SharedModule } from 'app/main/shared/shared.module';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  observer: true
};

const routes: Routes = [
  {
    path: '',
    component: ProfileSettingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-profile',
    component: ManageProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    ProfileSettingComponent,
    ManageProfileComponent,
    SettingSidebarComponent,
    ProfileVisibilityComponent,
    ProfileEmailComponent,
    ProfilePhotoHeaderComponent,
    ProfileAboutYouComponent,
  ],
  exports: [
    SettingSidebarComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    SwiperModule,
    FormsModule,
    CoreTouchspinModule,
    CoreSidebarModule,
    CoreCardModule,
    CardSnippetModule,
    NgbModule,
    NouisliderModule,
    NavbarModule,
    SharedModule,
    BlockUIModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class ProfileSettingModule { }
