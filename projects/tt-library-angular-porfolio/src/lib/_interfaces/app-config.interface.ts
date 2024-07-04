export interface IAppConfig {
  production: boolean;
  defaultLang: string;
  cookieStorageLangKey: string;
  cookieStorageDeviceIdKey: string;
  tokenKey: string;
  assetsUrl: string;
  apiUrl: string;
  email: string;
  phoneNumber: string;
  defaultPageSize: number;
  timeoutMs: number;
  settingFormat: ISettingFormat;
  firebaseConfig: IFirebaseConfig;
  googleConfig: IGoogleConfig;
  remoteModuleUrl: IRemoteModuleUrl;
  [key: string]: any;
}

export interface ISettingFormat {
  dateTime: {
    date: string;
    time: string;
    dateTime: string;
    portfolioDate: string;
    portfolioDateResponsive: string;
  };
  [key: string]: any;
}

export interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface IGoogleConfig {
  downloadCV: string;
  [key: string]: any;
}

export interface IRemoteModuleUrl {
  reactManagement: string;
  angularPortfolio: string;
  angularAuth: string;
  vueAnimation: string;
  [key: string]: any;
}
