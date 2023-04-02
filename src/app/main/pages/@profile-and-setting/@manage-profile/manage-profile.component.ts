import { Component, OnInit } from '@angular/core';
import { Logger } from 'ngx-api-sdk';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  protected logger = new Logger(ManageProfileComponent.name);

  constructor() { }

  ngOnInit(): void {
  }

}
