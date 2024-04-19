import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AssetsLink } from '../../_pipes';

@Component({
  selector: 'tt-logo',
  templateUrl: './logo.component.html',
  standalone: true,
  imports: [TranslateModule, CommonModule, AssetsLink],
})
export class LogoComponent implements OnInit {
  @Input() showLogo: boolean = true;
  // @Input() showText: boolean = true;
  @Input() customCls: string = '';
  @Input() customImgCls: string = '';
  @Input() customImgStyle: string = '';

  constructor() { }

  ngOnInit() {
  }

}
