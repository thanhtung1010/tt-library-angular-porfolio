import { Inject, Injectable } from "@angular/core";
import { IAppConfig } from "../../../_interfaces";
import { BehaviorSubject } from "rxjs";
import { APP_CONFIG_TOKEN } from "../../../_enums";

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

