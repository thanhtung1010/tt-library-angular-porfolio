import { Injectable } from "@angular/core";
import { DeviceUUID } from 'device-uuid';
import { APIService } from "./api.service";
import { AppConfigService } from "./app-config.service";
import { IApiObject, IDeviceID } from "../../../_interfaces";
import { CookieStorageHelper } from "../../../_helpers";

@Injectable({
  providedIn: 'root'
})

export class DeviceIdService {
  private deviceInfo!: IDeviceID;

  constructor(
    private apiService: APIService,
    private appConfigService: AppConfigService,
  ) {}

  init() {
    const _uuid = new CookieStorageHelper().get(this.appConfigService.appConfig.cookieStorageDeviceIdKey);
    if (!_uuid) {
      this.createDeviceId();
    } else {
      this.checkAcceptedDevice(_uuid);
    }
  }

  checkAcceptedDevice(uuid: string) {
    this.apiService.callApi({
      ...DEVICE_ID_API['CHECK_PERMISSION'],
      url: DEVICE_ID_API['CHECK_PERMISSION'].url + uuid
    }, {}).subscribe({
      next: resp => {
        this.deviceInfo = resp;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  createDeviceId() {
    const _device = new DeviceUUID();
    const deviceInfo = {
      uuid: _device.get(),
      info: JSON.stringify(_device.parse()),
    };
    this.apiService.callApi(DEVICE_ID_API['CREATE'], deviceInfo).subscribe({
      next: resp => {
        new CookieStorageHelper().set(this.appConfigService.appConfig.cookieStorageDeviceIdKey, deviceInfo.uuid);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  get accepted(): boolean {
    return !this.deviceInfo || this.deviceInfo.accepted;
  }

  get getDeviceInfor(): IDeviceID | undefined {
    return this.deviceInfo;
  }

  set setDeviceInfor(info: IDeviceID) {
    this.deviceInfo = info;
  }

}

export const DEVICE_ID_API: Record<string, IApiObject> = {
  CREATE: {
    url: 'device-info',
    method: 'POST'
  },
  CHECK_PERMISSION: {
    url: 'device-info/check-permission/',
    method: 'GET'
  },
};

