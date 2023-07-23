import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';
import { DropdownButtonLabelComponent } from './dropdown-button-header/dropdown-button-label.component';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NouisliderModule } from 'ng2-nouislider';
import { StableInputComponent } from './stable-input/stable-input.component';
import { StableTextareaComponent } from './stable-textarea/stable-textarea.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    DropdownButtonComponent,
    DropdownButtonLabelComponent,
    StableInputComponent,
    StableTextareaComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    FormsModule,
    CoreTouchspinModule,
    CoreSidebarModule,
    CoreCardModule,
    CardSnippetModule,
    NgbModule,
    NouisliderModule,
  ],
  exports: [
    DropdownButtonComponent,
    DropdownButtonLabelComponent,
    StableInputComponent,
    StableTextareaComponent,
    LoaderComponent
  ],
  entryComponents: [

  ]
})
export class SharedModule { }
