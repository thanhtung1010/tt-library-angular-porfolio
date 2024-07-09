import { ASSETS_TYPE, LANG_TYPE, htmlATagTarget } from "../_enums";

export interface ILang {label: string, lang: LANG_TYPE};

export interface IDeviceID {
  uuid: string;
  accepted: boolean;
};

export interface IMenuItem {
  label: string;
  show: boolean;
  href: string;
  active: boolean;
};

export interface IManagerMenuItem {
  code: string;
  title: string;
  path: string;
  showMenu: boolean;
  level?: number;
  icon: string;

  childList?: IManagerMenuItem[];
  openChild?: boolean;
  authGuard?: boolean;
  isActive?: boolean;

  roles?: any[];
  showGroup?: string;
  modules?: string[];
  parentList?: IManagerMenuItem[];
  parentTitle?: string;
  height?: number;
  tempId?: string;

  translatedTitle?: string;

  order?: number;
}

export interface ISocialNetwork {
  name: string;
  type: ASSETS_TYPE;
  action: 'copy' | 'url';
  content?: string;
  href?: string;
  target?: htmlATagTarget;
}
