import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/auth/service';
import { UserClass } from 'app/model/class/user-class.model';
import { Logger } from 'ngx-api-sdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-photo-header',
  templateUrl: './profile-photo-header.component.html',
  styleUrls: ['./profile-photo-header.component.scss']
})
export class ProfilePhotoHeaderComponent implements OnInit {
  protected logger = new Logger(ProfilePhotoHeaderComponent.name);

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
