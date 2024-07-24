import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BehaviorSubject, delay } from 'rxjs';
import { IManagerMenuItem } from '../../_interfaces';
import { AppConfigService, CommonService, MenuService } from '../../_modules/shared/_services';
import { AssetsLink } from '../../_pipes';

@Component({
  selector: 'tt-manager-sidebar',
  templateUrl: './manager-sidebar.component.html',
  styleUrls: ['./manager-sidebar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NzMenuModule,
    AssetsLink,
  ]
})
export class ManagerSidebarComponent implements OnInit, OnDestroy, AfterViewInit {
  isCollapsed = false;
  menu: IManagerMenuItem[] = [];
  currentActive: IManagerMenuItem | null = null;
  subscribeActiveMenu: any;
  subscribeResetHeighMenu: any;
  homePage = '/';
  changeScrollHeight: BehaviorSubject<any> = new BehaviorSubject(null);
  TRANSLATED_SORT_MENUS = ['MENU.ORDER.INDEX'];

  constructor(
    private appConfig: AppConfigService,
    private menuService: MenuService,
    private commonService: CommonService,
    // private router: Router,
    // private translate: TranslateService
  ) { }

  ngOnInit() {
    // get menus by action_group roles, sort by order
    this.menuService.initManagerMenu();
    this.menu = this.menuService.getManagerMenu.sort(elm => elm.order ?? 999);

    this.subscribeActiveMenu = this.appConfig.activeMenu.pipe(delay(200)).subscribe(activeMenu => {
      this.activeSideBar();
      this.currentActive = activeMenu;
    });
    this.subscribeResetHeighMenu = this.changeScrollHeight.pipe(delay(300)).subscribe(item => {
      if (item) this.resetHeightMenu(item)
    });
    this.homePage = this.menu && this.menu.length > 0 ? this.menu[0].path : '';

    const currentPath = location.pathname;
    if (!currentPath.includes(this.homePage) && !this.menu.find(elm => currentPath.includes(elm.path))) {
      this.commonService.gotoURL(this.homePage);
    }

    // this.setTranslatedTitle();
    // this.translate.onLangChange.subscribe(() => {
    //   this.setTranslatedTitle();
    // })
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.menu.forEach(item => {
        this.resetHeightMenu(item)
      })
    }, 300);
    setTimeout(() => {
      this.activeSideBar(true);
    }, 500)
  }

  activeSideBar(scrollToView = false) {
    const _url = this.commonService.url;
    const _parentReacher = _url.replace('/', '').split('/')[0] || '';
    if (this.menu && this.menu.length > 0) {
      this.menu.forEach((item, index) => {
        item.isActive = false;
        let urlToCompare = _url;
        // check for item parent
        if (_parentReacher && item.childList && item.childList.length) {
          urlToCompare = _parentReacher;
          item.childList.forEach(t => {
            t.isActive = false;
          })
        }

        if (urlToCompare.includes(item.path)) { // active parent
          item.isActive = true;
          item.openChild = false;
          this.onToggleMenuItem(null, index);
          if (scrollToView) this.scrollToViewByID(item.tempId || '');

          // if (item.childList && item.childList.length) {
          //   // open child
          //   const _childAllList = this.menuService.getAllMenusChild(item.childList);
          //   const _path = _url.replace('/', '');
          //   if (_childAllList && _childAllList.length) {
          //     const _childItemParentActive = _childAllList.find(t => t.path === _path);
          //     if (_childItemParentActive) {
          //       const _childrenIndex = item.childList.findIndex(t => t.title === (_childItemParentActive.parentTitle || ''));
          //       if (_childrenIndex > -1) {
          //         // open children
          //         item.childList[_childrenIndex].openChild = false;
          //         item.childList[_childrenIndex].isActive = true;
          //         this.onToggleMenuItem(index, _childrenIndex);

          //         if (scrollToView)
          //           this.scrollToViewByID(item.tempId || '', item.childList[_childrenIndex].tempId || '');
          //       }
          //     }
          //   }
          // }
        }
      })
    }
  }
  scrollToViewByID(id: string, childId = '') {
    const _obj = document.getElementById(id);
    const _objChild = document.getElementById(childId);
    const _penDiv = document.getElementById('tt-sidebar-menu');
    if (_obj && _penDiv) {
      let _topOffset = _obj.offsetTop;
      if (_objChild) {
        _topOffset += _objChild.offsetTop;
      }
      const _timeout = setTimeout(() => {
        _penDiv.scrollTop = _penDiv.scrollTop < _topOffset ? _topOffset : _penDiv.scrollTop;
        clearTimeout(_timeout);
      }, 600)
    }
  }
  initMenuRecursive(menus: IManagerMenuItem[] | undefined | null) {
    if (menus) {
      menus.forEach(item => {
        item.height = 0;
        item.tempId = 'menu_' + item.title;
        item.openChild = false;
        this.initMenuRecursive(item.childList);
      })
    }
  }

  resetHeightMenu(item: IManagerMenuItem) {
    const _divEle = document.getElementById(item.tempId || '');
    if (_divEle) {
      const _child = _divEle.getElementsByClassName('children');
      if (_child && _child.length) {
        item.height = _child[0].scrollHeight;
      }
    }
  }

  onToggleMenuItem(parentIndex: number | null, itemIndex: number) {
    let _parentItem: IManagerMenuItem | null = null;
    let _childItem: IManagerMenuItem | null = null;
    if (parentIndex === null) { // parent level
      _parentItem = this.menu[itemIndex];
      if (_parentItem) {
        _parentItem.openChild = !_parentItem.openChild;
      }
    } else {
      if (parentIndex !== null && itemIndex !== undefined) { // 1st level
        _parentItem = this.menu[parentIndex];
        if (_parentItem && _parentItem.childList && _parentItem.childList.length) {
          _childItem = _parentItem.childList[itemIndex];
          if (_childItem && _childItem.childList && _childItem.childList.length) {
            _childItem.openChild = !_childItem.openChild;
          }
        }
      }
    }
    // animation for parent
    if (_childItem) {
      this.changeScrollHeight.next(_childItem);
    }
    if (_parentItem) {
      const _timeout = setTimeout(() => {
        this.changeScrollHeight.next(_parentItem);
        clearTimeout(_timeout)
        setTimeout(() => {
          this.changeScrollHeight.next(_parentItem);
        }, 2000)
      }, 320)
    }
  }

  // setTranslatedTitle() {
  //   this.menu.forEach(item => {
  //     // if (this.TRANSLATED_SORT_MENUS.includes(item.code)) {
  //     if (item.childList) {
  //       item.childList.forEach(child => {
  //         child.translatedTitle = this.translate.instant(child.title);
  //       });
  //       const _sortByOrder = item.childList.some(child => child.order || child.order === 0);
  //       if (!_sortByOrder) item.childList = [...item.childList].sort(elm => elm.order ?? 999);
  //     }
  //     // }
  //   })
  // }

  ngOnDestroy() {
    if (this.subscribeActiveMenu)
      this.subscribeActiveMenu.unsubscribe();
    if (this.subscribeResetHeighMenu)
      this.subscribeResetHeighMenu.unsubscribe();
  }

}
