import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service';
import { LineSys } from 'app/model/routes/line-sys.route';
import { Logger } from 'ngx-api-sdk';

@Component({
  selector: 'app-navbar-profile-native',
  templateUrl: './navbar-profile-native.component.html',
  styleUrls: ['./navbar-profile-native.component.scss']
})
export class NavbarProfileNativeComponent implements OnInit {
  protected logger = new Logger(NavbarProfileNativeComponent.name);

  path_login = LineSys.path.path_login;

  /**
   * @param {AuthenticationService} _authService
   * @param {Router} _router
  */
  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout();
    this._router.navigate([`${LineSys.path.path_login}`]);
  }

}
