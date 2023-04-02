import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/auth/service';
import { UserClass } from 'app/model/class/user-class.model';
import { Logger } from 'ngx-api-sdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {
  protected logger = new Logger(NavbarUserComponent.name);

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
