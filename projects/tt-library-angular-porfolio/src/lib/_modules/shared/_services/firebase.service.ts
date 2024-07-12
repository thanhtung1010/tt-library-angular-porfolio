import { Inject, Injectable } from "@angular/core";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, browserLocalPersistence, browserPopupRedirectResolver, getAuth, initializeAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { collection, doc, Firestore, getDoc, getFirestore, where, query, getDocs, addDoc } from "firebase/firestore";
import { from, Observable, Subscriber } from "rxjs";
import { UserService } from ".";
import { APP_CONFIG_TOKEN, FIRESTORE_COLLECTION } from "../../../_enums";
import { IAppConfig, IFirestoreUser } from "../../../_interfaces";

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  firebaseApp?: FirebaseApp;
  auth?: Auth;
  store?: Firestore;

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

      //Init auth
      if (document !== undefined) {
        this.auth = initializeAuth(this.firebaseApp, {
          persistence: browserLocalPersistence,
          popupRedirectResolver: browserPopupRedirectResolver
        });
      } else {
        this.auth = getAuth(this.firebaseApp);
      }

      //Init store
      this.store = getFirestore(this.firebaseApp);
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

  initFireStore() {
    try {
      if (!this.firebaseApp) {
        throw new Error('firebase app is invalid');
      }
      this.store = getFirestore(this.firebaseApp);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  checkExistStore<T>(field: string, value: any): Observable<{empty: boolean; data: T | null}> {
    return new Observable<{empty: boolean; data: T | null}>((subs: Subscriber<{empty: boolean; data: T | null}>) => {
      try {
        if (!this.store) {
          this.initFireStore();
        }

        const _ref = collection(this.store as any, FIRESTORE_COLLECTION.USERS);
        const _query = query(_ref, where(field, "==", value));
        const _userSnap = from(getDocs(_query));

        _userSnap.subscribe({
          next: resp => {
            let _data: any = null;

            if (!resp.empty) {
              resp.forEach((doc) => {
                  if (!_data) {
                    _data = doc.data();
                }
              });
            }

            subs.next({
              empty: resp.empty,
              data: _data
            });
            subs.complete();
          },
          error: error => {
            subs.error(error);
            subs.complete();
          },
        });
      } catch (error) {
        subs.error(error);
        subs.complete();
      }
    });
  }

  getCollection<T>(collectionName: string): Observable<Array<T>> {
    return new Observable<Array<T>>((subs: Subscriber<Array<T>>) => {
      try {
        if (!this.store) {
          this.initFireStore();
        }

        const _ref = collection(this.store as any, collectionName);
        const _userSnap = from(getDocs(_ref));

        _userSnap.subscribe({
          next: resp => {
            const _data: Array<T> = [];

            if (!resp.empty) {
              resp.forEach((doc) => {
                _data.push(doc.data() as T);
              });
            }

            subs.next(_data);
            subs.complete();
          },
          error: error => {
            subs.error(error);
            subs.complete();
          },
        });
      } catch (error) {
        subs.error(error);
        subs.complete();
      }
    });
  }

  addNewDocument(collectionName: string, data: any): Observable<boolean> {
    return new Observable<boolean>((subs: Subscriber<boolean>) => {
      try {
        if (!this.store) {
          this.initFireStore();
        }

        const _ref = collection(this.store as any, collectionName);
        from(addDoc(_ref, data)).subscribe({
          next: resp => {
            subs.next(true);
          },
          error: error => {
            console.error(error);
            subs.next(false);
          }
        });
      } catch (error) {
        console.error(error);
        subs.next(false);
      }
    });
  }

  logout() {}

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
