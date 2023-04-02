import { Component, Input, OnInit } from '@angular/core';
import { UserClass } from 'app/model/class/user-class.model';
import { Strings } from 'app/util/strings.util';
import { Logger } from 'ngx-api-sdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar-user-builder',
  templateUrl: './navbar-user-builder.component.html',
  styleUrls: ['./navbar-user-builder.component.scss']
})
export class NavbarUserBuilderComponent implements OnInit {
  protected logger = new Logger(NavbarUserBuilderComponent.name);

  @Input() currentUser$: Observable<UserClass>;

  constructor() { }

  ngOnInit(): void {
  }

  /**
  * @param {string} name - 
  * @description - get short-username to show on avatar center
  */
  getShortUsername(name: string): string {
    return Strings.capitalizeFirstEachLetter(name);
  }

}
