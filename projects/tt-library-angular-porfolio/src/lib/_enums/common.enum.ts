import { InjectionToken } from "@angular/core";
import { IAppConfig, ILang } from "../_interfaces";


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

export const ZoomList = [
  {
    value: 0,
    text: 'HEAD.ZOOM_NORMAL'
  },
  {
    value: 1,
    text: 'HEAD.ZOOM_1X'
  },
  {
    value: 2,
    text: 'HEAD.ZOOM_2X'
  },
  {
    value: 3,
    text: 'HEAD.ZOOM_3X'
  }
]

export type htmlATagTarget = '_blank' |  '_parent' | '_self' | '_top';

export type ASSETS_TYPE = 'png' | 'svg' | 'i18n';

export type ANT_TABLE_ELEMENT_FIELD_TYPE = "text" | "dateTime" | "date" | "number" | "float" | "statusType" | "checkbox"
| "select" | "object" | "array" | "translate" | "hasChildColumn" | "view";

export type HTML_A_ELEMENT_TARGET = '_blank' |  '_parent' | '_self' | '_top';

export type LANG_TYPE = 'vi' | 'en';

export const APP_CONFIG_TOKEN = new InjectionToken<IAppConfig>('appConfig');
