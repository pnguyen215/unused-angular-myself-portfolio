import { Component, OnInit } from "@angular/core";
import { CoreConfigService } from "@core/services/config.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-activities",
  templateUrl: "./activities.component.html",
  styleUrls: ["./activities.component.scss"],
})
export class ActivitiesComponent implements OnInit {
  public coreConfig: any;
  private _config: any;
  private _unsubscribeAll: Subject<any>;

  /**
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(private _coreConfigService: CoreConfigService) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    // To update config local storage
    this._config = {
      layout: {
        navbar: {
          hidden: false,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: true,
      },
    };
    this._coreConfigService.config = this._config;
    this._coreConfigService.setConfig(this._config, { emitEvent: true });
  }

  ngOnInit(): void {
    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
