import { LANG_TYPE } from "../_types";

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
