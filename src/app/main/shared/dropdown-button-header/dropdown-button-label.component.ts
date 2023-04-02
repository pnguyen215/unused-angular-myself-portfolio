import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownButtonBind } from 'app/model/bind/dropdown-button-bind.model';
import { Logger } from 'ngx-api-sdk';

@Component({
  selector: 'app-dropdown-button-label',
  templateUrl: './dropdown-button-label.component.html',
  styleUrls: ['./dropdown-button-label.component.scss']
})
export class DropdownButtonLabelComponent implements OnInit {
  protected logger = new Logger(DropdownButtonLabelComponent.name);

  @Input() header: string;
  @Input() attribute: DropdownButtonBind;
  @Output() value: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onValue(e: any) {
    this.value.next(e);
  }
}
