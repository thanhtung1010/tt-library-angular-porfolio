import { Pipe, PipeTransform } from "@angular/core";
import { AppConfigService } from "../_services";
import { ASSETS_TYPE } from "../_types";

@Pipe({
  name: 'TTAssetsLink',
  standalone: true
})

export class AssetsLink implements PipeTransform {
  private paths: {path: string, type: ASSETS_TYPE}[] = [
    {
      path: 'assets/',
      type: 'svg'
    },
    {
      path: 'assets/imgs/',
      type: 'png'
    },
    {
      path: 'assets/',
      type: 'i18n'
    },
  ];

  constructor(private appConfigService: AppConfigService) {}

  transform(name: string, type: string, ...args: any): string {
    try {
      const _existPath = this.paths.find(path => path.type === type);

      if (!_existPath) return '';

      return this.appConfigService.appConfig?.assetsUrl + _existPath.path + type + '/' + name + '.' + type;
    } catch (error) {
      return '';
    }
  }
}
