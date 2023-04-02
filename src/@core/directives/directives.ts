import { NgModule } from '@angular/core';

import { FeatherIconDirective } from '@core/directives/core-feather-icons/core-feather-icons';
import { RippleEffectDirective } from '@core/directives/core-ripple-effect/core-ripple-effect.directive';
import { AutofocusDirective } from './auto-focus/autofocus.directive';
import { BlockP2CDirective } from './block-paste-copy-cut/block-p2-c.directive';

@NgModule({
  declarations: [
    RippleEffectDirective,
    FeatherIconDirective,
    BlockP2CDirective,
    AutofocusDirective
  ],
  exports: [
    RippleEffectDirective,
    FeatherIconDirective,
    BlockP2CDirective,
    AutofocusDirective
  ]
})
export class CoreDirectivesModule { }
