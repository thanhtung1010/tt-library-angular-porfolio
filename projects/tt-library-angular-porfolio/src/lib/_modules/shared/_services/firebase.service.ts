import { Inject, Injectable } from "@angular/core";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Observable, Subscriber } from "rxjs";
import { IAppConfig, IFirebaseConfig } from "../../../_interfaces";
import { AppConfigService } from ".";
import { APP_CONFIG_TOKEN } from "../../../_enums";
import { getAuth, Auth } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  firebaseApp?: FirebaseApp;
  auth?: Auth;

  constructor(
    @Inject(APP_CONFIG_TOKEN) private appConfig: IAppConfig,
  ) {
  }

  init() {
    try {
      if (!this.appConfig || !this.appConfig.firebaseConfig) {
        throw new Error('firebase config is invalid');
      }
      this.firebaseApp = initializeApp(this.appConfig.firebaseConfig);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  initAuth() {
    try {
      if (!this.firebaseApp) {
        throw new Error('firebase app is invalid');
      }
      this.auth = getAuth(this.firebaseApp);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  getDowloadURL(path: string): Observable<string> {
    return new Observable<string>((subs: Subscriber<string>) => {
      try {
        const storage = getStorage();
        getDownloadURL(ref(storage, path))
        .then((url) => {
          subs.next(url);
          subs.complete();
        })
        .catch((error) => {
          subs.error(error);
          subs.complete();
        });
      } catch (error) {
        subs.error(error);
        subs.complete();
      }
    });
  }
}
