import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { Observable, Subscriber } from "rxjs";
import { FIRESTORE_COLLECTION, FIRESTORE_PERMISSIOON, ROUTE } from '../_enums';
import { FirebaseService, UserService } from '../_modules/shared/_services';
import { v4 as uuid } from 'uuid';
import { IFirestoreUser } from '../_interfaces';
import { AppUserModel } from '../_modules/shared/_models';

export const managementActiveGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const userService = inject(UserService);

  if (!userService.user.init) {
    const firebaseService = inject(FirebaseService);
    const userService = inject(UserService);
    const router = inject(Router);

    // if (!firebaseService.auth) {
    //   firebaseService.initAuth();
    // }

    return new Observable((subs: Subscriber<boolean>) => {
      if (!firebaseService.auth) {
        router.navigate([ROUTE.AUTH]);
        subs.next(false);
        subs.complete();
      } else {
        onAuthStateChanged(firebaseService.auth,
          (user) => {
            if (user) {
              userService.user = {user: user} as any;

              firebaseService.checkExistStore<IFirestoreUser>('email', userService.user.email).subscribe({
                next: resp => {
                  if (resp.empty) {
                    const _uuid: string = uuid();
                    const _user: IFirestoreUser = {
                      uuid: _uuid,
                      email: userService.user.email,
                      phone_number: userService.user.phoneNumber,
                      permission: FIRESTORE_PERMISSIOON.USER
                    };
                    firebaseService.addNewDocument(FIRESTORE_COLLECTION.USERS, _user).subscribe(resp => {
                      if (resp) {
                        userService._uuid = _uuid;
                        subs.next(true);
                        subs.complete();
                      } else {
                        firebaseService.logout();
                        router.navigate([ROUTE.AUTH]);
                        subs.next(false);
                        subs.complete();
                      }
                    });
                  } else {
                    userService._uuid = resp.data?.uuid || '';
                    subs.next(true);
                    subs.complete();
                  }
                },
                error: error => {
                  console.error(error);
                  firebaseService.logout();
                  router.navigate([ROUTE.AUTH]);
                  subs.next(false);
                  subs.complete();
                }
              });
            } else {
              firebaseService.logout();
              router.navigate([ROUTE.AUTH]);
              subs.next(false);
              subs.complete();
            }
          },
          error => {
            console.error(error);
            router.navigate([ROUTE.AUTH]);
            subs.next(false);
            subs.complete();
          }
        );
      }
    });
  } else {
    return true;
  }
};
