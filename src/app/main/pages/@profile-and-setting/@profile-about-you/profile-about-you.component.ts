import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownButtonBind, DropdownButtonOptions } from 'app/model/bind/dropdown-button-bind.model';
import { UserClass } from 'app/model/class/user-class.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Logger } from 'ngx-api-sdk';

@Component({
  selector: 'app-profile-about-you',
  templateUrl: './profile-about-you.component.html',
  styleUrls: ['./profile-about-you.component.scss']
})
export class ProfileAboutYouComponent implements OnInit {
  protected logger = new Logger(ProfileAboutYouComponent.name);

  @BlockUI() blockUI: NgBlockUI;
  @BlockUI('form-section') formBlockUI: NgBlockUI;

  @Input() currentUser$: UserClass;

  private _currentUser: UserClass;
  formGroup: FormGroup;

  conditional = {
    minLengthUsername: 5,
    maxLengthUsername: 20,
    minLengthDescription: 5,
    maxLengthDescription: 100,
    minLengthFullName: 5,
    maxLengthFullName: 20,
    minLengthJobTitle: 5,
    maxLengthJobTitle: 40,
    minLengthDepartment: 10,
    maxLengthDepartment: 30,
    minLengthOrganization: 5,
    maxLengthOrganization: 30,
    maxLengthEmail: 30
  }

  options: DropdownButtonOptions[] = [
    {
      label: 'Anyone',
      value: 1,
      description: 'Visible to anyone who can view your content. Accessible by installed apps.'
    },
    {
      label: 'Only you',
      value: 2,
      description: 'Only visible to you.'
    },
  ];

  commonOptions: DropdownButtonBind = {
    defaultLabel: 'Anyone',
    options: this.options,
    effectValue: true
  };

  /**
   * @param {FormBuilder} formBuilder
  */
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.onParams();
    this.loadForms();
  }

  get form() { return this.formGroup.controls; }

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  /**
   * @description - callback block ui
  */
  onBlockUI() {
    this.formBlockUI.start();
    this.onSubmitted();
    setTimeout(() => {
      this.formBlockUI.stop();
    }, 2500);
  }

  protected onParams() {
    this._currentUser = { ...this.currentUser$ };
  }

  protected prepare() {
    const form = this.formGroup.value;
    this.currentUser$.username = form.username;
    this.currentUser$.full_name = form.full_name;
    this.currentUser$.self.job_title = form.job_title;
    this.currentUser$.self.department_name = form.department_name;
    this.currentUser$.self.organization_name = form.organization_name;
    this.currentUser$.email = form.email;
  }

  loadForms() {
    this.formGroup = this.formBuilder.group({
      username: [this.currentUser$.username, Validators.compose([
        Validators.required
      ])],
      full_name: [this.currentUser$.full_name, Validators.compose([
        Validators.maxLength(this.conditional.maxLengthFullName)
      ])],
      job_title: [this.currentUser$.self.job_title, Validators.compose([
        Validators.maxLength(this.conditional.maxLengthJobTitle)
      ])],
      department_name: [this.currentUser$.self.department_name, Validators.compose([
        Validators.maxLength(this.conditional.maxLengthDepartment)
      ])],
      organization_name: [this.currentUser$.self.organization_name, Validators.compose([
        Validators.maxLength(this.conditional.maxLengthOrganization)
      ])],
      email: [this.currentUser$.email, Validators.compose([
        Validators.email, Validators.maxLength(this.conditional.maxLengthEmail)
      ])]
    });
  }

  onSubmitted() {
    this.prepare();
  }

  reset() {
    this.formGroup.reset();
    this.currentUser$ = { ...this._currentUser };
    this.loadForms();
  }

  onValue(event: any) {
    this.logger.info('event changed = ', event);
  }
}
