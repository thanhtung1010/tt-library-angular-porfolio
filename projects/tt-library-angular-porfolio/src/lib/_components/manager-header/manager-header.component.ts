import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LANG_TYPE, ZoomList } from '../../_enums';
import { Helpers } from '../../_helpers';
import { LangService, UserService } from '../../_modules/shared/_services';
import { AssetsLink } from '../../_pipes';
import { ILang } from '../../_interfaces';

@Component({
  selector: 'tt-manager-header',
  templateUrl: './manager-header.component.html',
  styleUrls: ['./manager-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NzToolTipModule,
    TranslateModule,
    NzSelectModule,
    NzPopoverModule,
    NzModalModule,
    NzButtonModule,
    FormsModule,
    AssetsLink,
  ],
})
export class ManagerHeaderComponent implements OnInit, OnDestroy {
  //#region Variables
  currentLang = 'en';
  fullNameUser = '';
  currentUser: any | null = null;
  subscribe: any = null;
  languages: ILang[] = [];
  zooms: any[] = ZoomList;
  currentZoom = 0;
  menuMb = {
    rightMenu: false,
    leftMenu: false
  }
  avaName = '';
  unreadCount = 0;
  visibleProfilePopOver: boolean = false;
  loading = {
    profile: false,
    setUI: false,
  };
  // isHiddenSwitchCountry = true;

  @Output() logout = new EventEmitter<any>();
  //#endregion

  constructor(
    private langService: LangService,
    private userService: UserService,
  ) {
    this.currentLang = this.langService.getLang;
  }

  ngOnInit() {
    if (this.userService.user) {
      this.fullNameUser = this.userService.user.displayName;
      this.currentUser = this.userService.user;
      this.avaName = Helpers.getCharNameBySpace(this.fullNameUser, 2);
    }
    this.languages = this.langService.langs$.value;
  }
  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
  onChangeLanguage($event: LANG_TYPE) {
    // this.appConfig.changeLanguage($event);
    // this.updateSubProfile($event, 'language');
  }
  onZoomUI($event: number) {
    // this.appConfig.zoomUI($event);
    // this.updateSubProfile($event, 'fontSize');
  }
  onToggleProfilePopOver() {
    this.visibleProfilePopOver = !this.visibleProfilePopOver;
  }
  onLogout() {
    this.logout.emit();
  }
}
