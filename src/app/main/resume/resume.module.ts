import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CoreCommonModule } from "@core/common.module";
import { TranslateModule } from "@ngx-translate/core";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { ResumeComponent } from "./resume.component";

const routes: Routes = [
  {
    path: "home",
    component: ResumeComponent,
    data: { animation: "home" },
  },
];

@NgModule({
  declarations: [ResumeComponent],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CommonModule,
    CoreCommonModule,
  ],
  exports: [],
})
export class ResumeModule {}
