import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/auth/service';
import { UserClass } from 'app/model/class/user-class.model';
import { Logger } from 'ngx-api-sdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-email',
  templateUrl: './profile-email.component.html',
  styleUrls: ['./profile-email.component.scss']
})
export class ProfileEmailComponent implements OnInit {
  protected logger = new Logger(ProfileEmailComponent.name);

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
