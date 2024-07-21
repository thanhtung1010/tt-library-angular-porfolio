import { User } from "firebase/auth";

export interface IUserResp extends User {
  [key: string]: any;
}
export interface IStsTokenManager {
  accessToken: string;
  expirationTime: number;
  refreshToken: string;
}

export interface IReloadUserInfo {
  localId: string;
  email: string;
  displayName: string;
  photoUrl: string;
  emailVerified: boolean;
  providerUserInfo: IProviderUserInfo[];
  validSince: string;
  lastLoginAt: string;
  createdAt: string;
  lastRefreshAt: string;
}

export interface IProviderUserInfo {
  providerId: string;
  displayName: string;
  photoUrl: string;
  federatedId: string;
  email: string;
  rawId: string;
}
