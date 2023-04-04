import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";
import { KeyService } from "app/auth/service";
import { CoreKeys } from "app/model/keys/core-keys.key";
import { LineSys } from "app/model/routes/line-sys.route";
import { Logger } from "ngx-api-sdk";

@Component({
  selector: "app-setting-sidebar",
  templateUrl: "./setting-sidebar.component.html",
  styleUrls: ["./setting-sidebar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SettingSidebarComponent implements OnInit {
  protected logger = new Logger(SettingSidebarComponent.name);

  @Output() onChangeValue: EventEmitter<number> = new EventEmitter();

  id: number = 1;
  KEY_NO_PROFILE_VISIBILITY_DEFAULT =
    CoreKeys.KEY_NO_PROFILE_VISIBILITY_DEFAULT;
  KEY_NO_EMAIL_DEFAULT = CoreKeys.KEY_NO_EMAIL_DEFAULT;
  KEY_NO_SECURITY_DEFAULT = CoreKeys.KEY_NO_SECURITY_DEFAULT;
  KEY_NO_ACCOUNT_REFS_DEFAULT = CoreKeys.KEY_NO_ACCOUNT_REFS_DEFAULT;
  KEY_NO_LINK_REFS_DEFAULT = CoreKeys.KEY_NO_LINK_REFS_DEFAULT;
  application = "";

  /**
   * @param {Router} _router
   */
  constructor(private _router: Router, private _keyService: KeyService) {}

  ngOnInit(): void {
    this.onValueEffect(this.id);
    this.application = this._keyService.getConfigNameApplication();
  }

  /**
   * @param {number} value
   */
  private onValueEffect(value: number) {
    this.onChangeValue.next(value);
  }

  /**
   * @param {number} id
   */
  onChange(id: number) {
    this.id = id > 0 ? id : 1;
    this.onValueEffect(this.id);
  }

  /**
   * @param {number} value
   */
  onStyleChanged(value: number) {
    if (this.id == value) {
      return "btn btn-flat-primary btn-block text-left";
    }
    return "btn btn-flat-secondary btn-block text-left";
  }

  redirectTo() {
    this._router.navigate([`${LineSys.lines.line_home}`]);
  }
}
