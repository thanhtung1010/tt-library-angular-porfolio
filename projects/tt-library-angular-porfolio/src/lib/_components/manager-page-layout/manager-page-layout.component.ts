import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AppConfigService, UserService } from '../../_modules/shared/_services';
import { AssetsLink } from '../../_pipes';
import { ManagerHeaderComponent, ManagerSidebarComponent } from '..';

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
export class ManagerPageLayoutComponent implements OnInit, OnDestroy {
  isLoadingInfo: boolean = false;
  isCollapsed: boolean = true;

  constructor(
    private appConfig: AppConfigService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

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

  /**
   * Log out of system
   */
  logout() {
    this.userService.logout();
  }

}
