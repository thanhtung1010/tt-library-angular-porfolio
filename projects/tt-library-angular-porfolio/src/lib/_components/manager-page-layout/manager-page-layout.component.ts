import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ManagerHeaderComponent, ManagerSidebarComponent } from '..';
import { ROUTE } from '../../_enums';
import { CommonService, FirebaseService } from '../../_modules/shared/_services';
import { AssetsLink } from '../../_pipes';

@Component({
  selector: 'tt-manager-page-layout',
  templateUrl: './manager-page-layout.component.html',
  styleUrls: ['./manager-page-layout.component.scss'],
  standalone: true,
  imports: [
    NzLayoutModule,
    CommonModule,
    AssetsLink,
    ManagerHeaderComponent,
    ManagerSidebarComponent,
  ]
})
export class ManagerPageLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('pageElement') pageElement: ElementRef | null = null;
  @ViewChild('pageFooter') pageFooter: ElementRef | null = null;

  @Input() fixedFooter: boolean = false;

  @HostListener('window:resize')
  onResize() {
    this.resizePage(1);
  }

  pageFixCls = 'tt-page-fixed-footer';
  isLoadingInfo: boolean = false;
  isCollapsed: boolean = true;

  constructor(
    private firebaseService: FirebaseService,
    private commonService: CommonService,
  ) {
  }

  ngOnInit(): void {
    this.resizePage(0);
  }

  ngOnDestroy(): void { }

  ngAfterViewInit(): void {
    const _timeout = setTimeout(() => {
      this.resizePage(1);
      clearTimeout(_timeout)
    }, 0);
  }

  /**
   * Start tracking change routes
   */
  trackChangeRouting() {
    // this.actionWithPath(this._router.url.split('?')[0] || this._router.url);

    // this._router.events.subscribe(evt => {
    //   if (evt instanceof NavigationStart) {
    //     this.checkIfIsMain(evt.url);
    //     // console.log('NavigationStart', evt.url)
    //   }
    //   if (evt instanceof NavigationEnd) {
    //     // console.log('*** NavigationEnd > evt', evt, evt.urlAfterRedirects);
    //     this.actionWithPath(evt.urlAfterRedirects.split('?')[0] || evt.urlAfterRedirects);
    //     Helpers.scrollToTop(true)
    //   }
    // })
  }

  /**
   * Action when detect path string
   * @param path Path to detecting
   */
  actionWithPath(path: string) {
    // const _menuActive = this._menuService.getMenuPath(path);
    // this._appSetting.activeMenu.next(_menuActive);
  }

  subscribeTitle() {
    // this.subscribeTitleSys = this._appSetting.activeMenu.subscribe(_menuActive => {
    //   if (_menuActive) {
    //     this._translate.get(_menuActive.title).subscribe(t => {
    //       if (t) {
    //         // set title browser
    //         this._titleService.setTitle(`${t} «${environment.appTitle}»`);
    //       } else {
    //         this._titleService.setTitle(environment.appTitle);
    //       }
    //     });
    //   } else {
    //     this._titleService.setTitle(environment.appTitle);
    //   }
    // })
  }

  resizePage(size: number = 0) {
    if (this.pageFooter && this.fixedFooter) {
      if (size) {
        // this.setConfig();
        this.setFooterClass('fixed', 'add');
        this.pageFooter.nativeElement.style.width = navigator.userAgent.indexOf('WebKit') != -1
          ? `-webkit-fill-available`
          : `-moz-available`;
      } else {
        this.setFooterClass('fixed', 'remove');
        this.pageFooter.nativeElement.style.width = ``;
      }
    }
  }
  setFooterClass(cls: string, type: 'add' | 'remove' = 'add') {
    if (this.pageFooter) {
      try {
        if (type === 'add') {
          this.pageFooter.nativeElement.classList.add(cls);
        } else {
          this.pageFooter.nativeElement.classList.remove(cls);
        }
      }
      catch (e) {
        console.log(e)
      }
    }
  }
  setPageClass(cls: string, type: 'add' | 'remove' = 'add') {
    if (this.pageElement) {
      try {
        if (type === 'add') {
          this.pageElement.nativeElement.classList.add(cls);
        } else {
          this.pageElement.nativeElement.classList.remove(cls);
        }
      }
      catch (e) {
        console.log(e)
      }
    }
  }

  /**
   * Log out of system
   */
  logout() {
    this.firebaseService.logout().subscribe(resp => {
      if (resp) {
        this.commonService.gotoURL(`${ROUTE.AUTH}`, null, true);
      } else {
        this.commonService.showError();
      }
    });
  }

}
