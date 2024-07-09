import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable, Subscriber } from "rxjs";
import { FirebaseService, UserService } from '../_modules/shared/_services';
import { ROUTE } from '../_enums';
import { onAuthStateChanged, User } from 'firebase/auth';

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

    if (!firebaseService.auth) {
      firebaseService.initAuth();
    }

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
              subs.next(true);
              subs.complete();
            } else {
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
