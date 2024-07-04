import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { AssetsLink } from '../../_pipes';
import { EmptyComponent } from '../empty/empty.component';

@Component({
  selector: 'tt-page-layout',
  templateUrl: './page-layout.component.html',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    EmptyComponent,
    FooterComponent,
    TranslateModule,
    AssetsLink,
  ]
})
export class PageLayoutComponent implements OnInit {
  @ViewChild('main') main!: ElementRef<HTMLElement>;
  @Input() showFooter: boolean = true;
  @Input() showHeader: boolean = true;
  @Input() haveNoMainContent: boolean = false;

  customClsEmptyMain: string = 'tt-empty_main';
  emptyMainMsg: string = 'MESSAGE.EMPTY';
  emptyMainImg: string = 'being-updated';

  constructor() { }

  ngOnInit() {
  }

}
