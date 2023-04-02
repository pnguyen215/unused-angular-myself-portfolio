import { NgModule } from '@angular/core';

import { FilterPipe } from '@core/pipes/filter.pipe';

import { InitialsPipe } from '@core/pipes/initials.pipe';

import { SafePipe } from '@core/pipes/safe.pipe';
import { StripHtmlPipe } from '@core/pipes/stripHtml.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';

@NgModule({
  declarations: [
    InitialsPipe,
    FilterPipe,
    StripHtmlPipe,
    SafePipe,
    TruncateTextPipe
  ],
  imports: [],
  exports: [
    InitialsPipe,
    FilterPipe,
    StripHtmlPipe,
    SafePipe,
    TruncateTextPipe
  ]
})
export class CorePipesModule { }
