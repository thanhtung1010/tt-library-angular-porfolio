import { ILang, IMenuItem } from "../_interfaces";
import { ROUTE } from "./route.enum";


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

export const MENU: Array<IMenuItem> = [
  {
    label: "MENU.HOME",
    show: true,
    href: ROUTE.PORTFOLIO + '/' + ROUTE.PORTFOLIO_HOME,
    active: true,
  },
  {
    label: "MENU.ABOUT_ME",
    show: true,
    href: ROUTE.PORTFOLIO + '/' + ROUTE.PORTFOLIO_ABOUT_ME,
    active: false,
  },
  // {
  //   label: "MENU.WORK_EXP",
  //   queryParams: QUERYPARAMS_NAV.WORK_EXP,
  //   show: true,
  // },
  // {
  //   label: "MENU.SKILL",
  //   queryParams: QUERYPARAMS_NAV.SKILL,
  //   show: true,
  // },
  // {
  //   label: "MENU.PERSONAL_PROJECT",
  //   queryParams: QUERYPARAMS_NAV.PERSONAL_PROJECT,
  //   show: true,
  // },
  // {
  //   label: "MENU.CONTACT_INFOR",
  //   queryParams: QUERYPARAMS_NAV.CONTACT_INFOR,
  //   show: true,
  // },
];

export type htmlATagTarget = '_blank' |  '_parent' | '_self' | '_top';

export type ASSETS_TYPE = 'png' | 'svg' | 'i18n';

export type ANT_TABLE_ELEMENT_FIELD_TYPE = "text" | "dateTime" | "date" | "number" | "float" | "statusType" | "checkbox"
| "select" | "object" | "array" | "translate" | "hasChildColumn" | "view";

export type HTML_A_ELEMENT_TARGET = '_blank' |  '_parent' | '_self' | '_top';

export type LANG_TYPE = 'vi' | 'en';
