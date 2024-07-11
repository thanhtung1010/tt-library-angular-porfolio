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

export const authActiveGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const firebaseService = inject(FirebaseService);
  const userService = inject(UserService);
  const router = inject(Router);

  // if (!firebaseService.auth) {
  //   firebaseService.initAuth();
  // }

  return new Observable((subs: Subscriber<boolean>) => {
    if (!firebaseService.auth) {
      subs.next(true);
      subs.complete();
    } else {
      onAuthStateChanged(firebaseService.auth,
        (user) => {
          if (user) {
            userService.user = {user: user} as any;
            router.navigate([ROUTE.CMS]);
            subs.next(false);
            subs.complete();
          } else {
            subs.next(true);
            subs.complete();
          }
        },
        error => {
          console.error(error);
          subs.next(true);
          subs.complete();
        }
      );
    }
  });
};
