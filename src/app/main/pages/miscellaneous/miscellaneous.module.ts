import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';

import { ErrorComponent } from 'app/main/pages/miscellaneous/error/error.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

const routes: Routes = [
  {
    path: 'miscellaneous/coming-soon',
    component: ComingSoonComponent
  },
  {
    path: 'miscellaneous/maintenance',
    component: MaintenanceComponent
  },
  {
    path: 'miscellaneous/not-authorized',
    component: NotAuthorizedComponent
  },
  {
    path: 'miscellaneous/error',
    component: ErrorComponent,
    data: { animation: 'misc' }
  },
];

@NgModule({
  declarations: [
    ErrorComponent,
    NotAuthorizedComponent,
    MaintenanceComponent,
    ComingSoonComponent
  ],
  imports: [
    CommonModule,
    CoreCommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MiscellaneousModule { }
