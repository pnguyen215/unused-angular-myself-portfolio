import { Component, OnInit } from "@angular/core";
import { Logger } from "ngx-api-sdk";

@Component({
  selector: "app-navbar-avatar-default",
  templateUrl: "./navbar-avatar-default.component.html",
  styleUrls: ["./navbar-avatar-default.component.scss"],
})
export class NavbarAvatarDefaultComponent implements OnInit {
  protected logger = new Logger(NavbarAvatarDefaultComponent.name);

  constructor() {}

  ngOnInit(): void {}
}
