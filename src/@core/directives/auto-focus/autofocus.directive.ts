import {
  Directive,
  ElementRef,
  Input,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {

  private focus = true;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    if (this.focus) {
      window.setTimeout(() => {
        this.element.nativeElement.focus();
      });
    }
  }

  @Input() set autofocus(condition: boolean) {
    this.focus = condition !== false;
  }
}
