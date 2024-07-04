import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HiddenOnSrollDirective } from '../../directives';
import { LogoComponent } from '../logo/logo.component';
import { AssetsLink } from '../../_pipes';
import { ROUTE } from '../../_enums';
import { MenuService } from '../../_modules/shared/_services';
import { LinkButtonLayoutComponent } from '../link-button-layout/link-button-layout.component';

@Component({
  selector: 'tt-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    HiddenOnSrollDirective,
    CommonModule,
    LinkButtonLayoutComponent,
    LogoComponent,
    AssetsLink,
  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('header') header!: ElementRef<HTMLHeadingElement>;

  route = ROUTE;

  logoSVGIcon: string = "simple-icon";
  hiddenCls: string = 'tt-header-hidden';
  whiteBGCls: string = 'tt-white_bg';

  constructor(
    private router: Router,
    private menuService: MenuService
  ) { }

  ngOnInit() {
  }

  handleShowHeaderScrollUp(position: number) {
    if (!this.header) return;

    let _headerCls = this.header.nativeElement.className;
    if (position > 0) {
      if (!_headerCls.includes(this.whiteBGCls)) this.header.nativeElement.className = `${_headerCls} ${this.whiteBGCls}`;
    } else {
      this.header.nativeElement.className = _headerCls.replace(this.whiteBGCls, '');
    }
  }

  handleHeaderInit(position: number) {
    if (!this.header) return;

    let _headerCls = this.header.nativeElement.className;
    if (position > 0) {
      this.header.nativeElement.className = `${_headerCls} ${this.whiteBGCls}`;
    }
  }

  openMenu() {
    this.menuService.toggleVisibleMenu$.next(true);
  }
}
