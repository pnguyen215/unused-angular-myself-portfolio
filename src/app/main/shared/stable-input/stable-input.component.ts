import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Logger, allNotNull } from 'ngx-api-sdk';

export enum Type {
  NUMBER = 'number',
  TEXT = 'text'
}

@Component({
  selector: 'app-stable-input',
  templateUrl: './stable-input.component.html',
  styleUrls: ['./stable-input.component.scss']
})
export class StableInputComponent implements OnInit {
  protected logger = new Logger(StableInputComponent.name);

  @Input() data: any;
  @Input() currency: string = '';
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() type: Type = Type.TEXT;
  @Output() onValue: EventEmitter<any> = new EventEmitter();

  editMode = false;

  constructor() { }

  ngOnInit(): void {
    this.onFocusValue(); // fallback for value first
  }

  hasText(): boolean {
    return allNotNull(this.type) && this.type === Type.TEXT;
  }

  hasNumeric(): boolean {
    return allNotNull(this.type) && this.type === Type.NUMBER;
  }

  onFocusValue() {
    this.onValue.next(this.data);
  }

}
