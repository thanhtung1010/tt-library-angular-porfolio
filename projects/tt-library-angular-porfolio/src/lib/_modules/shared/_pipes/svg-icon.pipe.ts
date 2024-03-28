import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { isEmpty } from "lodash";

/**
 * Base on file menu-icons to generate
 */
@Pipe({
  name: "TTSvgIcon",
  standalone: true
})
export class SvgIconPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(
    iconId: string,
    custom?: any,
    returnText?: boolean,
    args?: any
  ): any {
    try {
      if (!iconId || isEmpty(iconId)) return null;
      const _style = custom ? custom["style"] : null;
      const _cls = custom ? custom["class"] : null;
      const _text = `<svg ${_style
        ? 'style="' +
        JSON.stringify(_style)
          .replace(/\"|{|}/g, "")
          .replace(/,/g, ";") +
        '"'
        : ""
        } ${_cls ? "class=" + _cls : ""}><use xlink:href="#${iconId}"></use></svg>`;
      return returnText ? _text : this.sanitizer.bypassSecurityTrustHtml(_text);
    } catch (error) {
      console.error("SvgIconPipe not implemented.");
      return '';
    }
  }
}
