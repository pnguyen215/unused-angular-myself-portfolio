import { Component, OnInit } from "@angular/core";
import { Logger } from "ngx-api-sdk";

@Component({
  selector: "app-navbar-avatar-self",
  templateUrl: "./navbar-avatar-self.component.html",
  styleUrls: ["./navbar-avatar-self.component.scss"],
})
export class NavbarAvatarSelfComponent implements OnInit {
  protected logger = new Logger(NavbarAvatarSelfComponent.name);
  aUrl = "/assets/images/resume/phuocnguyenit97.jpg";

  constructor() {}

  ngOnInit(): void {}
}
