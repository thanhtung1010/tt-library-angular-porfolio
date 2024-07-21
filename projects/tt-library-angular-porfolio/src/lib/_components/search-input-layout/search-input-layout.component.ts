import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AssetsLink } from '../../_pipes';

@Component({
  selector: 'tt-search-input-layout',
  templateUrl: './search-input-layout.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzInputModule,
    NzGridModule,
    AssetsLink,
  ]
})
export class SearchInputLayoutComponent {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() loading: boolean = false;
  constructor() { }
}
