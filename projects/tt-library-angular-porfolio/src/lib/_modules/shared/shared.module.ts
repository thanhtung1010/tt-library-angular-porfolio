import { ModuleWithProviders, NgModule } from "@angular/core";
import { IAppConfig } from "../../_interfaces";
import { AppConfigService } from "./_services/app-config.service";
import {
  CommonService,
  DeviceIdService,
  LangService,
  MenuService,
  APIService,
  FirebaseService,
  UserService,
} from './_services';
import { CommonModule } from '@angular/common';

import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { APP_CONFIG_TOKEN } from "../../_enums";

@NgModule({
  imports: [
    NzEmptyModule,
    CommonModule,
    NzGridModule,
    NzCollapseModule,
    NzToolTipModule,
    TranslateModule,
    NzPopconfirmModule,
    NzTableModule,
    NzPaginationModule,
  ],
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
        FirebaseService,
        APIService,
        LangService,
        CommonService,
        DeviceIdService,
        MenuService,
        UserService,
      ]
    }
  }
}
