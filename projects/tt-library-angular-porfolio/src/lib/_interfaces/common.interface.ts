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

export interface ISocialNetwork {
  name: string;
  type: ASSETS_TYPE;
  action: 'copy' | 'url';
  content?: string;
  href?: string;
  target?: htmlATagTarget;
}
