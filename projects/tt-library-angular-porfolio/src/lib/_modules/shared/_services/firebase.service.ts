import { Inject, Injectable } from "@angular/core";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, browserLocalPersistence, browserPopupRedirectResolver, getAuth, initializeAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Observable, Subscriber } from "rxjs";
import { UserService } from ".";
import { APP_CONFIG_TOKEN } from "../../../_enums";
import { IAppConfig } from "../../../_interfaces";

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  firebaseApp?: FirebaseApp;
  auth?: Auth;

  constructor(
    @Inject(APP_CONFIG_TOKEN) private appConfig: IAppConfig,
    private userService: UserService
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
      if (document !== undefined) {
        this.auth = initializeAuth(this.firebaseApp, {
          persistence: browserLocalPersistence,
          popupRedirectResolver: browserPopupRedirectResolver
        });
      } else {
        this.auth = getAuth(this.firebaseApp);
      }
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
