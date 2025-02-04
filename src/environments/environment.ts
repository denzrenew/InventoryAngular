// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultauth: 'appapi',
  pageSzie: 10,
  maxPages: 10,
  appapiConfig: {
    apiKey: 'sample key here',
    apiUrl: 'https://localhost:7196/api',
    siteUrl: 'https://localhost:4200/',
    regUrl: 'https://localhost:4200//account/signup',

  },
  captcha: {
    key: '6Lf8l-ooAAAAAMwFzdgZviGmP1CnBRFK1kAVBZSo',
  },
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
