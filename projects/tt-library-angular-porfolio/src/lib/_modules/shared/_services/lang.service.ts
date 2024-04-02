import { Injectable, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";
import { LANG_TYPE } from "../../../_types";
import { DEFAULT_LANG, LANG_LIST } from "../../../_enums";
import { ILang } from "../../../_interfaces";
import { CookieStorageHelper } from "../../../_helpers";
import { AppConfigService } from "./app-config.service";

@Injectable({
  providedIn: "root"
})

export class LangService {
  lang$: BehaviorSubject<LANG_TYPE> = new BehaviorSubject(DEFAULT_LANG);
  langs$: BehaviorSubject<Array<ILang>> = new BehaviorSubject([] as Array<ILang>);
  constructor(
    private appConfigService: AppConfigService,
    private translateService: TranslateService,
  ) {}

  init() {
    this.initLangList();
    this.initLang();
  }

  initLangList() {
    const _langs = LANG_LIST;
    this.langs$.next(_langs);
  }

  initLang() {
    const appConfig = this.appConfigService.appConfig;
    const _lang = new CookieStorageHelper().get(appConfig?.cookieStorageLangKey || '');
    this.setLang = _lang || appConfig?.defaultLang;
  }

  get getLang(): LANG_TYPE {
    return this.lang$.value;
  }

  set setLang(lang: LANG_TYPE) {
    const _validate = this.validateLang(lang);
    const appConfig = this.appConfigService.appConfig;
    if (_validate) {
      this.lang$.next(lang);
      new CookieStorageHelper().set(appConfig?.cookieStorageLangKey || '', lang);
      this.translateService.use(lang);
    } else {
      this.lang$.next(DEFAULT_LANG);
      new CookieStorageHelper().set(appConfig?.cookieStorageLangKey || '', DEFAULT_LANG);
      this.translateService.use(DEFAULT_LANG);
    }
  }

  private validateLang(lang: LANG_TYPE): boolean {
    return !!this.langs$.value.find(langObj => langObj.lang === lang);
  }
}
