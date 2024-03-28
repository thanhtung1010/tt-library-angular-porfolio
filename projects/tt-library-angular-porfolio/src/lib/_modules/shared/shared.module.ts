import { ModuleWithProviders, NgModule } from "@angular/core";
import { IAppConfig } from "./_interfaces";
import { APP_CONFIG_TOKEN, AppConfigService } from "./_services/app-config.service";
import { APIService } from "./_services/api.service";
import { LangService } from "./_services";

@NgModule({
  imports: []
})

export class SharedModule {

  static forRoot(config: IAppConfig): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: APP_CONFIG_TOKEN,
          useValue: config,
        },
        AppConfigService,
        APIService,
        LangService
      ]
    }
  }
}
