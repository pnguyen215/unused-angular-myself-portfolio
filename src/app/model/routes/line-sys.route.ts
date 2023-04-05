export class LineSys {
  static lines = {
    line_home: "home",
    line_cv: "resume",
  };

  static routes = {
    route_login1: "authentication/login-v1",
    route_login2: "authentication/login-v2",
  };

  static path = {
    path_login: "/pages/authentication/login-v1",
    path_error: "/pages/miscellaneous/error",
    path_maintenance: "/pages/miscellaneous/maintenance",
    path_not_authorized: "/pages/miscellaneous/not-authorized",
    path_coming_soon: "/pages/miscellaneous/coming-soon",
    path_profile_setting: "/setting",
  };
}
