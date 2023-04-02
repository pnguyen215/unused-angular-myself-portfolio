import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/auth/service';
import { UserClass } from 'app/model/class/user-class.model';
import { Logger } from 'ngx-api-sdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-visibility',
  templateUrl: './profile-visibility.component.html',
  styleUrls: ['./profile-visibility.component.scss']
})
export class ProfileVisibilityComponent implements OnInit {
  protected logger = new Logger(ProfileVisibilityComponent.name);

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
