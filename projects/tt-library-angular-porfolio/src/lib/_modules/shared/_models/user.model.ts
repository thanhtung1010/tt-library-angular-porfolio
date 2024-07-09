import { IReloadUserInfo, IStsTokenManager, IUserResp } from "../../../_interfaces/user.interface";

export class AppUserModel {
  private stsTokenManager?: IStsTokenManager;

  emailVerified: boolean = false;
  isAnonymous: boolean = false;
  init: boolean = false;

  displayName: string = '';
  email: string = '';
  phoneNumber: string = '';

  reloadUserInfo?: IReloadUserInfo;

  constructor(user?: IUserResp) {
    if (user) {
      this.checkForString('displayName', user.displayName);
      this.checkForString('email', user.email);
      this.checkForString('phoneNumber', user.phoneNumber);

      this.checkForBoolean('emailVerified', user.emailVerified);
      this.checkForBoolean('isAnonymous', user.isAnonymous);

      if (typeof user['stsTokenManager'] === 'object' && Object.keys(user['stsTokenManager']).length) {
        this.stsTokenManager = user['stsTokenManager'];
      }

      if (typeof user['reloadUserInfo'] === 'object' && Object.keys(user['reloadUserInfo']).length) {
        this.reloadUserInfo = user['reloadUserInfo'];
      }
    }

    this.init = !!this.stsTokenManager;
  }

  get refreshToken(): string {
    return this.stsTokenManager?.refreshToken || '';
  }

  private checkForString(
    param:
      | 'displayName'
      | 'email'
      | 'phoneNumber',
    value: any,
  ) {
    if (value !== undefined) {
      if (value && typeof value === 'string' && value.length) {
        this[param] = value;
      }
    }
  }

  private checkForBoolean(param: 'emailVerified' | 'isAnonymous', value: any) {
    if (value !== undefined) {
      if (typeof value === 'boolean') {
        this[param] = value;
      } else {
        this[param] = value === 'true';
      }
    }
  }

  // private checkForNumber(
  //   param: 'pageNumber' | 'pageSize' | 'totalElements' | 'totalPages',
  //   value: any,
  //   keepZero = false,
  // ) {
  //   if (value !== undefined) {
  //     if ((value || (keepZero === true && value === 0)) && !isNaN(+value)) {
  //       this[param] = +value;
  //     }
  //   }
  // }
}
