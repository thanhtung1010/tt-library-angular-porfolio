import { Inject, Injectable, InjectionToken } from "@angular/core";
import { IAppConfig } from "../../../_interfaces";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AppConfigService {
  private _config = new BehaviorSubject<IAppConfig | null>(null);
  constructor(@Inject(APP_CONFIG_TOKEN) private appConfigToken: IAppConfig) {}

  get appConfig(): IAppConfig {
    const _config: any = this._config.value;
    return _config;
  }

  initAppConfig() {
    this._config.next(this.appConfigToken);
  }
}

export const APP_CONFIG_TOKEN = new InjectionToken<IAppConfig>('appConfig');
