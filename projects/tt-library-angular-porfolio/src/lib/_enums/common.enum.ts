import { ILang, IMenuItem } from "../_interfaces";
import { LANG_TYPE } from "../_types";
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

