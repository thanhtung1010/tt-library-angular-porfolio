import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { BaseIndexWinfitModel } from "../_modules/shared/_models";

@Pipe({
  name: 'TTBMRPerAge',
  standalone: true,
})

export class BMRPerAgePipe implements PipeTransform {

  constructor(
    private santiti: DomSanitizer
  ) {}

  transform(baseInfo: BaseIndexWinfitModel, keepOrigin: boolean = false, args?: any): SafeHtml {
    const { katchMcArdle, mifflinStJeor } = baseInfo.bmr;
    let _bmr = katchMcArdle && !Number.isNaN(katchMcArdle) ? katchMcArdle : mifflinStJeor;
    let _class: string[] = ['tt-bold', 'tt-koho'];
    let _content: string = '';

    if (Number.isNaN(_bmr)) {
      _class.push('tt-red');
      _content = `N/A`;
    } else {
      _content = keepOrigin ? _bmr.toString() : (_bmr / baseInfo.weightIndex).toFixed(2);
    }

    if (args?.removeBold) {
      _class = _class.filter(cls => cls !== 'tt-bold' && cls !== 'tt-koho');
    }

    const returnValue = `<p class="${_class.join(' ')}">${_content}</p>`;
    return this.santiti.bypassSecurityTrustHtml(returnValue);
  }
}
