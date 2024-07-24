import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: 'TTNaNNumber',
  standalone: true,
})

export class NaNNumberPipe implements PipeTransform {

  constructor(private santity: DomSanitizer) {}

  transform(value: any, ...args: any[]): SafeHtml {
    let htmlValue: number = NaN;
    const valueType = typeof value;

    switch (valueType) {
      case 'number':
        htmlValue = value;
        break;

      case 'string':
        htmlValue = +value;
        break;
      default:
        break;
    }

    let returnValue = '';
    if (Number.isNaN(htmlValue)) {
      returnValue = `<span class="tt-red tt-bold tt-koho">N/A</span>`
    } else {
      returnValue = `<span class="tt-bold tt-koho">${htmlValue}</span>`;
    }

    return this.santity.bypassSecurityTrustHtml(returnValue);
  }
}
