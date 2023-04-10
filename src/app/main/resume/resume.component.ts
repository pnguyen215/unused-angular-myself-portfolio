import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CoreConfigService } from "@core/services/config.service";
import { ResumeService } from "app/auth/service";
import { ResumeClass } from "app/model/class/resume-class.model";
import { CatchErrors } from "app/util/catch-errors.util";
import { Logger, toJson } from "ngx-api-sdk";
import { Subject, Subscription, throwError } from "rxjs";
import { catchError, delay, finalize, first, takeUntil, tap } from "rxjs/operators";

@Component({
  selector: "app-resume",
  templateUrl: "./resume.component.html",
  styleUrls: ["./resume.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeComponent implements OnInit {
  protected logger = new Logger(ResumeComponent.name);
  public coreConfig: any;
  private _config: any;
  protected unsubscribe: Subscription[] = [];
  private _unsubscribeAll: Subject<any>;
  isLoading = false;
  error = "";
  aUrl = "/assets/images/resume/phuocnguyenit97.jpg";
  resumeContent: ResumeClass;

  /**
   * @param {CoreConfigService} _coreConfigService,
   *  @param {ResumeService} _resumeService
   */
  constructor(private _coreConfigService: CoreConfigService,
    private _resumeService: ResumeService) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    // To update config local storage
    this._config = {
      layout: {
        navbar: {
          hidden: true,
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
    this.onGet();
    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });
  }

  onGet() {
    this.isLoading = true;
    this.error = "";
    const isFetched = this._resumeService
      .getResume()
      .pipe(
        first(),
        delay(1000),
        tap(() => { }),
        catchError((error) => {
          this.error = CatchErrors.onErrorsLoggedIn(error);
          return throwError(error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (response) => {
          if (response.header.code === 200) {
            this.resumeContent = new ResumeClass(response.items);
            this.logger.info('resume fetched = ', toJson(this.resumeContent));
          } else {
            this.error = response.message;
          }
        },
        (error: HttpErrorResponse) => {
          this.error = CatchErrors.onErrorShorten(error);
        }
      );

    this.unsubscribe.push(isFetched);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
