import { Component, Input, OnInit } from '@angular/core';
import { UserClass } from 'app/model/class/user-class.model';
import { Strings } from 'app/util/strings.util';
import { Logger } from 'ngx-api-sdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar-avatar-builder',
  templateUrl: './navbar-avatar-builder.component.html',
  styleUrls: ['./navbar-avatar-builder.component.scss']
})
export class NavbarAvatarBuilderComponent implements OnInit {
  protected logger = new Logger(NavbarAvatarBuilderComponent.name);

  @Input() currentUser$: Observable<UserClass>;
  @Input() classImage: string = 'avatar';
  @Input() zClassInitials: string = 'avatar avatar-md bg-light-primary';

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * @param {UserClass} currentUser - 
   * @description - get short-username to show on avatar center
  */
  getShortUsername(currentUser: UserClass): string {
    if (currentUser?.full_name != null && currentUser?.full_name != undefined && currentUser?.full_name != '') {
      return Strings.getFirstEachLetters(currentUser.full_name, true);
    }
    return Strings.getFirstEachLetters(currentUser?.username, true);
  }

}
