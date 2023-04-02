import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownButtonBind, DropdownButtonOptions } from 'app/model/bind/dropdown-button-bind.model';
import { allNotNull, Logger, toJson } from 'ngx-api-sdk';

@Component({
  selector: 'app-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss']
})
export class DropdownButtonComponent implements OnInit {
  protected logger = new Logger(DropdownButtonComponent.name);

  @Input() attribute: DropdownButtonBind;
  @Output() value: EventEmitter<any> = new EventEmitter();
  flagPref: any;

  constructor(

  ) { }

  ngOnInit(): void {
    this.onPref();
  }

  onPref() {
    if (!allNotNull(this.attribute.classBtn)) {
      this.attribute.classBtn = 'btn btn-flat-dark';
    }
    this.onDefaultValue();
  }

  onDefaultValue() {
    if (!this.hasOptions()) {
      return;
    }

    for (const item of this.attribute.options) {
      if (item.label === this.attribute.defaultLabel) {
        this.flagPref = item.label;
        this.onValue(item.value);
        break;
      }
    }
  }

  onValue(e: any) {
    this.value.next(e);
  }

  hasOptions(): boolean {
    return allNotNull(this.attribute.options) && this.attribute.options?.length > 0;
  }

  hasEffectValue(): boolean {
    return allNotNull(this.attribute.effectValue) && this.attribute.effectValue;
  }

  onSelect(e: DropdownButtonOptions) {
    if (!this.hasEffectValue()) {
      return;
    }

    this.flagPref = e.label;
    this.onValue(e.value);
  }

  onClass(e: DropdownButtonOptions) {
    if (!this.hasOptions()) {
      return '';
    }

    if (!(e.label == this.flagPref)) {
      return '';
    }

    return 'active';
  }
}
