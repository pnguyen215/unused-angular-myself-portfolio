import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { CoreCommonModule } from "@core/common.module";

import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { SampleComponent } from "./sample.component";
import { HomeComponent } from "./home.component";
import { AuthGuard } from "app/auth/helpers/auth.guards";

const routes = [
  {
    path: "sample",
    component: SampleComponent,
    data: { animation: "sample" },
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   data: { animation: 'home' },
  //   canActivate: [AuthGuard]
  // }
];

@NgModule({
  declarations: [SampleComponent, HomeComponent],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
  ],
  exports: [SampleComponent, HomeComponent],
})
export class SampleModule {}
