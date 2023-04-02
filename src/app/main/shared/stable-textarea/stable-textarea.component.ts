import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Logger } from 'ngx-api-sdk';

@Component({
  selector: 'app-stable-textarea',
  templateUrl: './stable-textarea.component.html',
  styleUrls: ['./stable-textarea.component.scss']
})
export class StableTextareaComponent implements OnInit {
  protected logger = new Logger(StableTextareaComponent.name);

  @Input() data: any;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() maxLength: number = 40;
  @Output() onValue: EventEmitter<any> = new EventEmitter();

  editMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  onFocusValue() {
    this.onValue.next(this.data);
  }

}
