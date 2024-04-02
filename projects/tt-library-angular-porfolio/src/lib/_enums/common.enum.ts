import { ILang } from "../_interfaces";
import { LANG_TYPE } from "../_types";


export const DEFAULT_LANG: LANG_TYPE = 'vi';
export const LANG_LIST: Array<ILang> = [
  {
    lang: 'vi',
    label: 'LANG.VI'
  },
  {
    lang: 'en',
    label: 'LANG.EN'
  }
];

export const ROUTE = {
  MANAGEMENT: 'management',
  NOT_FOUND: 'not-found',
  PORTFOLIO: '',

  PORTFOLIO_HOME: 'home',
  PORTFOLIO_ABOUT_ME: 'about-me',

  OUTSIDE_MANAGEMENT: 'auth',
  OUTSIDE_MANAGEMENT_LOGIN: '',
  OUTSIDE_MANAGEMENT_LOGOUT: 'log-out',

  INSIDE_MANAGEMENT: 'home',
  INSIDE_HOME_MANAGEMENT: 'manager-home-page',
  INSIDE_ABOUT_ME_MANAGEMENT: 'manager-about-me-page',
};
