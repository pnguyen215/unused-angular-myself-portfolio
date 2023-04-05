// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  attributes: {
    log: {
      enabled: false,
    },
    hmr: {
      enabled: false,
    },
    banner: {
      title: "Resume",
    },
    layout_builder: {
      enabled: false, // (Enable theme customized)
    },
    profile_and_setting: {
      enabled: false,
    },
    navbar: {
      allow_hide_profile: false,
      allow_use_avatar_self: true,
    },
  },
  components: {
    auth_service: {
      enabled: false,
      storage_key_token: "ngx_key_token",
      storage_key_user: "ngx_key_user",
      fake_access_token:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcml2aWxlZ2VzIjp7ImlzX3JlYWQiOnRydWUsImlzX3ZpZXciOmZhbHNlLCJpc193cml0ZSI6ZmFsc2UsImlzX2NyZWF0ZSI6ZmFsc2V9LCJjb2RlIjoyMDAsInVzZXJfbmFtZSI6Im9zZXMwNEBnbWFpbC5jb20iLCJyb2xlc0lkIjpbMTMsMywxXSwidXNlcklkIjoxMCwiYXV0aG9yaXRpZXMiOlsiaXNfd3JpdGU6ZmFsc2UiLCJST0xFX1VTRVIiLCJpc192aWV3OmZhbHNlIiwiUk9MRV9ERVZFTE9QRVJTIiwiaXNfY3JlYXRlOmZhbHNlIiwiUk9MRV9BRE1JTiIsImlzX3JlYWQ6dHJ1ZSJdLCJleHBpcmVzQXQiOiIyMDQ5LTA3LTI4IDA5OjI2OjAxIiwiY2xpZW50X2lkIjoic2l2YW9zTWFuYWdlclRlYW0iLCJhdWQiOlsicHJvZHVjdC1hcGkiXSwic3lzU3ViamVjdHNQZXJtcyI6W3siaWQiOjIsIm5hbWUiOiJWaWV3IE9uZSBSb2xlcyIsInByaXZpbGVnZXMiOiJpc19yZWFkIiwicHJpdmlsZWdlc01hcCI6eyJpc19yZWFkIjp0cnVlfSwibmFtZVNsdWciOiJST0xFU19NT0RVTEVTX1BFUk1fMTA2In0seyJpZCI6MTQsIm5hbWUiOiJWaWV3IFN5cyBTdWJqZWN0IiwicHJpdmlsZWdlcyI6ImlzX3JlYWQiLCJwcml2aWxlZ2VzTWFwIjp7ImlzX3JlYWQiOnRydWV9LCJuYW1lU2x1ZyI6IlNZU19TVUJKRUNUX01PRFVMRVNfUEVSTV8xMDEifV0sInNjb3BlIjpbInJlYWQiLCJ3cml0ZSIsInRydXN0IiwiYWN0aXZlIl0sIm9yZ2FuaXphdGlvbiI6InNpdmFvc29yZyIsImV4cCI6MjUxMTA1MTk2MSwianRpIjoiMjRlOGQzNjktYzI4ZS00OTliLThmMDctZjYzZmM0ODBiNTQwIiwiZW1haWwiOiJvc2VzMDRAZ21haWwuY29tIn0.FM9FpazYZ3Y05kKOdGVStu31eO7RfZ_n-xstgYO1ISs",
    },
  },
  apiKey: {
    name_service: "",
  },
  host: {
    authorization: "http://localhost:8085",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
