export const environment = {
  production: true,
  defaultauth: 'appapi',
  pageSzie: 10,
  maxPages: 10,
  appapiConfig: {
    apiKey: 'sample key here',

    //Live

    apiUrl: 'https://inventory-management.com/api',
    siteUrl: 'https://inventory-management.com',
    regUrl: 'https://inventory-management.com/account/signup'
    
  },
  captcha: {
    key: '6Lcum-ooAAAAAOfSmiOkwxkyay8f0zERGsW7_wUJ', // Paste Captcha Key here
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
