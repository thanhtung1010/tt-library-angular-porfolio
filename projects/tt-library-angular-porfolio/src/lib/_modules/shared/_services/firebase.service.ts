import { Inject, Injectable } from "@angular/core";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, browserLocalPersistence, browserPopupRedirectResolver, getAuth, initializeAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { collection, doc, Firestore, getDoc, getFirestore, where, query, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { from, Observable, of, Subscriber } from "rxjs";
import { UserService } from ".";
import { APP_CONFIG_TOKEN, FIRESTORE_COLLECTION } from "../../../_enums";
import { IAppConfig, IFirestoreSearchDocument, IFirestoreUser } from "../../../_interfaces";

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  firebaseApp?: FirebaseApp;
  auth?: Auth;
  store?: Firestore;

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

  getCollection<T>(collectionName: string, userID: string): Observable<Array<T>> {
    return new Observable<Array<T>>((subs: Subscriber<Array<T>>) => {
      try {
        if (!this.store) {
          this.initFireStore();
        }

        const _ref = collection(this.store as any, collectionName);
        const _query = query(_ref, where('userID', '==', userID));
        const _userSnap = from(getDocs(_query));

        _userSnap.subscribe({
          next: resp => {
            const _data: Array<T> = [];

            if (!resp.empty) {
              resp.forEach((doc) => {
                const _docdata: T = {
                  ...doc.data() as T,
                  firebaseID: doc.id
                };
                _data.push(_docdata);
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

  updateDocument(collectionName: string, firebaseID: string, data: any): Observable<boolean> {
    return new Observable<boolean>((subs: Subscriber<boolean>) => {
      try {
        if (!this.store) {
          this.initFireStore();
        }

        const _ref = doc(this.store as any, collectionName, firebaseID);
        from(updateDoc(_ref, data)).subscribe({
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

  searchDocument<T>(collectionName: string, userID: string, searchField: IFirestoreSearchDocument): Observable<Array<T>> {
    return searchField.value ? this.searchDocumentWithField<T>(collectionName, userID, searchField) : this.getCollection<T>(collectionName, userID);
  }

  searchDocumentWithField<T>(collectionName: string, userID: string, searchField: IFirestoreSearchDocument): Observable<Array<T>> {
    return new Observable<Array<T>>((subs: Subscriber<Array<T>>) => {
      try {
        if (!this.store) {
          this.initFireStore();
        }

        const _ref = collection(this.store as any, collectionName);
        const _query = query(_ref, where('userID', '==', userID));
        const _userSnap = from(getDocs(_ref));

        _userSnap.subscribe({
          next: resp => {
            let _data: Array<T> = [];

            if (!resp.empty) {
              resp.forEach((doc) => {
                const _docdata: T = {
                  ...doc.data() as T,
                  firebaseID: doc.id
                };
                _data.push(_docdata);
              });
            }
            _data = _data.filter((elm: any) => {
              let returnValue: boolean = false;
              const valueType = typeof elm[searchField.field];
              switch (valueType) {
                case 'string':
                  returnValue = elm[searchField.field].includes(searchField.value);
                  break;

                default:
                  returnValue = elm[searchField.field] === searchField.value;
                  break;
              }

              return returnValue;
            });

            subs.next(_data);
            subs.complete();
          },
          error: error => {
            console.error(error);
            subs.next([]);
            subs.complete();
          },
        });
      } catch (error) {
        console.error(error);
        subs.next([]);
        subs.complete();
      }
    });
  }

  searchDocumentWithID<T>(collectionName: string, userID: string, firebaseID: string): Observable<T | null> {
    return new Observable<T | null>((subs: Subscriber<T | null>) => {
      try {
        if (!this.store) {
          this.initFireStore();
        }

        const _docref = doc(this.store as any, collectionName, firebaseID);
        const _userSnap = from(getDoc(_docref));

        _userSnap.subscribe({
          next: resp => {
            let _data: T | null = null;

            if (resp.exists()) {
              const _docdata: any = resp.data();

              if (_docdata['userID'] && _docdata['userID'] === userID) {
                _data = _docdata;
              }
            }

            subs.next(_data);
            subs.complete();
          },
          error: error => {
            console.error(error);
            subs.next(null);
            subs.complete();
          },
        });
      } catch (error) {
        console.error(error);
        subs.next(null);
        subs.complete();
      }
    });
  }

  deleteDocumentWithID<T>(collectionName: string, firebaseID: string): Observable<boolean> {
    return new Observable<boolean>((subs: Subscriber<boolean>) => {
      try {
        if (!this.store) {
          this.initFireStore();
        }

        const _docref = doc(this.store as any, collectionName, firebaseID);
        const _userSnap = from(deleteDoc(_docref));

        _userSnap.subscribe({
          next: resp => {
            subs.next(true);
            subs.complete();
          },
          error: error => {
            console.error(error);
            subs.next(false);
            subs.complete();
          },
        });
      } catch (error) {
        console.error(error);
        subs.next(false);
        subs.complete();
      }
    });
  }

  logout(): Observable<boolean> {
    return new Observable((subs: Subscriber<boolean>) => {
      try {
        if (!this.auth) {
          subs.next(true);
          subs.complete();
        } else {
          from(signOut(this.auth)).subscribe({
            next: resp => {
              subs.next(true);
              subs.complete();
            },
            error: error => {
              console.error("Error signing out user:", error);
              subs.next(false);
              subs.complete();
            }
          });
        }
      } catch (error) {
        console.error("Error signing out user:", error);
        subs.next(false);
        subs.complete();
      }
    });
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
