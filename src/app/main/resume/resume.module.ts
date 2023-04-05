import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CoreCommonModule } from "@core/common.module";
import { TranslateModule } from "@ngx-translate/core";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { ResumeComponent } from "./resume.component";
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from "ngx-perfect-scrollbar";
import { LineSys } from "app/model/routes/line-sys.route";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { TechnicalSkillsComponent } from "./technical-skills/technical-skills.component";
import { ProfessionalExperienceComponent } from "./professional-experience/professional-experience.component";
import { EducationComponent } from "./education/education.component";
import { TalentComponent } from "./talent/talent.component";
import { ActivitiesComponent } from "./pastimes-and-activities/activities.component";

const routes: Routes = [
  {
    path: `${LineSys.lines.line_cv}`,
    children: [
      {
        path: "home",
        component: ResumeComponent,
        data: { animation: "home" },
      },
      {
        path: "about",
        component: AboutComponent,
        data: { animation: "about" },
      },
      {
        path: "technical-skills",
        component: TechnicalSkillsComponent,
        data: { animation: "technical-skills" },
      },
      {
        path: "professional-experience",
        component: ProfessionalExperienceComponent,
        data: { animation: "professional-experience" },
      },
      {
        path: "education",
        component: EducationComponent,
        data: { animation: "education" },
      },
      {
        path: "talent",
        component: TalentComponent,
        data: { animation: "talent" },
      },
      {
        path: "pastimes-and-activities",
        component: ActivitiesComponent,
        data: { animation: "pastimes-and-activities" },
      },
    ],
  },
];

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
  declarations: [
    ResumeComponent,
    HomeComponent,
    AboutComponent,
    TechnicalSkillsComponent,
    ProfessionalExperienceComponent,
    EducationComponent,
    TalentComponent,
    ActivitiesComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CommonModule,
    CoreCommonModule,
    PerfectScrollbarModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class ResumeModule {}
