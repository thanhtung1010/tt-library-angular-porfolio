import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { IApiObject } from "../../../_interfaces";
import { URLHelper } from "../../../_helpers/url.helper";
import { Helpers } from "../../../_helpers";

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  defaultErrorMsg: string = "MESSAGE.SYSTEM_ERROR";
  defaultSuccessMsg: string = "MESSAGE.SYSTEM_SUCCESS";

  constructor(
    private _router: Router,
    private translate: TranslateService,
    private message: NzMessageService,
  ) {}

  get url(): string {
    return this._router.url;
  }

  gotoURL(url: string, queryParams?: any, reload?: boolean) {
    if (queryParams) {
      if (reload) {
        const _url = `${location.origin}/${url}?${Helpers.convertObjectToParams(queryParams)}`
        location.href = _url;
      } else {
        this._router.navigate([url], {queryParams: queryParams});
      }
    } else {
      if (reload) {
        const _url = `${location.origin}/${url}`
        location.href = _url;
      } else {
        this._router.navigate([url]);
      }
    }
  }

  parseUrlObj(urlObj: IApiObject, params?: any[], queryParams?: any): IApiObject {
    let _url = urlObj.url;
    if (urlObj.external) {
      // _url = this.config.configData?.APP_API_GID + _url;
    }
    return {
      ...urlObj,
      url: `${_url}${this.parseParams(params, queryParams)}`
    }
  }

  private parseParams(params?: any[], queryParams?: any): string {
    if (!params && !queryParams) return '';

    if (params && params.length) {
      return params.join('/') + '?' + URLHelper.convertObjectToParams(queryParams);
    } else {
      return '?' + URLHelper.convertObjectToParams(queryParams);
    }
  }

  showError(msg?: string) {
    if (!msg) {
      this.message.error(this.translate.instant(this.defaultErrorMsg));
    } else {
      try {
        const _msg = this.translate.instant(msg);
        this.message.error(_msg);
      } catch (error) {
        console.error(error)
        this.message.error(this.translate.instant(this.defaultErrorMsg));
      }
    }
  }

  showSuccess(msg?: string) {
    if (!msg) {
      this.message.success(this.translate.instant(this.defaultSuccessMsg));
    } else {
      try {
        const _msg = this.translate.instant(msg);
        this.message.success(_msg);
      } catch (error) {
        console.error(error)
        this.message.success(this.translate.instant(this.defaultSuccessMsg));
      }
    }
  }

  copyToClipboard(content: any, msg?: {success: string, error: string}) {
    try {
      window.navigator.clipboard.writeText(content)
      .then(resp => {
        this.showSuccess(msg?.success ?? '');
      })
      .catch(error => {
        console.error('error window.navigator.clipboard', error);
        this.showError(msg?.error ?? '');
      })
    } catch (error) {
      console.error('error copyToClipboard', error);
      this.showError(msg?.error ?? '');
    }
  }
}
