import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'app/auth/service';
import { UserClass } from 'app/model/class/user-class.model';
import { Logger } from 'ngx-api-sdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar-avatar',
  templateUrl: './navbar-avatar.component.html',
  styleUrls: ['./navbar-avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarAvatarComponent implements OnInit {
  protected logger = new Logger(NavbarAvatarComponent.name);

  currentUser$: Observable<UserClass>;

  /**
   * @param {AuthenticationService} _authService
  */
  constructor(
    private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this._authService.currentUser;
  }
}
