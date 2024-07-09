import { IManagerMenuItem, IMenuItem } from "../_interfaces";
import { MANAGER_PERMISSION_MODULE } from "./feature.enum";

export const ROUTE = {
  CMS: 'cms',
  AUTH: 'auth',
  NOT_FOUND: 'not-found',
  PORTFOLIO: 'my-porfolio',
  ANIMATION_PORTFOLIO: 'animation-portfolio',

  PORTFOLIO_HOME: 'home',
  PORTFOLIO_ABOUT_ME: 'about-me',

  AUTH_LOGIN: '',
  AUTH_LOGOUT: 'log-out',

  CMS_MAIN: 'main',
  CMS_MANAGEMENT_HOME_PAGE: 'manager-home-page',
  CMS_MANAGEMENT_ABOUT_ME_PAGE: 'manager-about-me-page',
};

export const ROUTE_ICON = {
  MAIN: 'home',
  COMMON: 'admin-menu',
};

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
  {
    label: "MENU.ANIMATION",
    show: false,
    href: ROUTE.ANIMATION_PORTFOLIO,
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

export const MANAGER_MENU: Array<IManagerMenuItem> = [
  {
    path: `${ROUTE.CMS}/${ROUTE.CMS_MAIN}`,
    showMenu: true,
    code: 'MENU.CMS_MAIN',
    title: 'MENU.CMS_MAIN',
    showGroup: '1',
    roles: undefined,
    icon: ROUTE_ICON.MAIN,
    modules: [MANAGER_PERMISSION_MODULE.MAIN],
    order: 0,
    // childList: TOP_CHILD
  },
  {
    path: `${ROUTE.CMS}/${ROUTE.CMS_MANAGEMENT_HOME_PAGE}`,
    showMenu: true,
    code: 'MENU.CMS_MANAGEMENT_HOME_PAGE',
    title: 'MENU.CMS_MANAGEMENT_HOME_PAGE',
    showGroup: '1',
    roles: undefined,
    icon: ROUTE_ICON.COMMON,
    modules: [MANAGER_PERMISSION_MODULE.MANAGEMENT_HOME_PAGE],
    order: 1,
    // childList: TOP_CHILD
  },
  {
    path: `${ROUTE.CMS}/${ROUTE.CMS_MANAGEMENT_ABOUT_ME_PAGE}`,
    showMenu: true,
    code: 'MENU.CMS_MANAGEMENT_ABOUT_ME_PAGE',
    title: 'MENU.CMS_MANAGEMENT_ABOUT_ME_PAGE',
    showGroup: '1',
    roles: undefined,
    icon: ROUTE_ICON.COMMON,
    modules: [MANAGER_PERMISSION_MODULE.MANAGEMENT_ABOUT_ME_PAGE],
    order: 2,
    // childList: TOP_CHILD
  },
];
