import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from "rxjs";
import { FirebaseService } from '../_modules/shared/_services';

export const authActiveGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const firebaseService = inject(FirebaseService);
  firebaseService.init();
  // if ()
  // if (!firebaseService.auth) {
  //   firebaseService.initAuth();
  // }

  // firebaseService.auth?.authStateReady().then()
  return true;
};
