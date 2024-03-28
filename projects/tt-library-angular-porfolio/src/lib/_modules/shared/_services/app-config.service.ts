import { Inject, Injectable, InjectionToken } from "@angular/core";
import { IAppConfig } from "../_interfaces";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AppConfigService {
  private _config = new BehaviorSubject<IAppConfig | null>(null);
  constructor(@Inject(APP_CONFIG_TOKEN) private appConfigToken: IAppConfig) {}

  get appConfig(): IAppConfig | null {
    return this._config.value;
  }

  initAppConfig(config: IAppConfig) {
    this._config.next(config);
  }
}

export const APP_CONFIG_TOKEN = new InjectionToken<IAppConfig>('appConfig');
