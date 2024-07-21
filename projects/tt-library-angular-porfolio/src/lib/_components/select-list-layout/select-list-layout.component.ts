import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'tt-select-list-layout',
  templateUrl: './select-list-layout.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzGridModule,
  ]
})
export class SelectListLayoutComponent {
  @Input() label: string = '';
  @Input() showLabel: boolean = true;
  @Input() placeholder: string = '';
  @Input() allowClear: boolean = false;
  @Input() required: boolean = false;

  constructor() { }
}
