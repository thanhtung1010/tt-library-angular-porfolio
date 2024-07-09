import { Injectable } from "@angular/core";
import { UserCredential } from "firebase/auth";
import { AppUserModel } from "../_models";
import { BehaviorSubject, Observable } from "rxjs";

Injectable({
  providedIn: 'root'
})

export class UserService {
  private _user: BehaviorSubject<AppUserModel> = new BehaviorSubject(new AppUserModel());

  constructor() {}

  get user(): AppUserModel {
    return this._user.value;
  }

  set user(info: UserCredential) {
    this._user.next(new AppUserModel(info.user));
  }

  logout() {}
}
