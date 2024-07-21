import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MANAGER_MENU, MENU } from "../../../_enums";
import { IManagerMenuItem, IMenuItem } from "../../../_interfaces";
import { AppConfigService } from "./app-config.service";

@Injectable({
  providedIn: "root"
})

export class MenuService {
  //#region variable
  private managerMenu$: BehaviorSubject<Array<IManagerMenuItem>> = new BehaviorSubject([] as Array<IManagerMenuItem>);
  private menu$: BehaviorSubject<Array<IMenuItem>> = new BehaviorSubject([] as Array<IMenuItem>);
  toggleVisibleMenu$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  hiddenScrollCls: string = 'tt-hidden_scroll';
  //#endregion

  constructor(
    private appConfigSerice: AppConfigService,
  ) {}

  init() {
    const isProdEnv = this.appConfigSerice.appConfig.production;
    const _menu = MENU.filter(menuItem => isProdEnv ? menuItem.show : true).map(menu => {
      return {
        ...menu,
        active: location.pathname === menu.href,
      }
    });
    this.menu$.next(_menu);
  }

  initManagerMenu() {
    const isProdEnv = this.appConfigSerice.appConfig.production;
    const _menu = MANAGER_MENU.filter(menuItem => isProdEnv ? menuItem.showMenu : true).map(menu => {
      return {
        ...menu,
        active: location.pathname === menu.path,
      }
    });
    this.managerMenu$.next(_menu);
  }

  get getMenu(): IMenuItem[] {
    return this.menu$.value;
  }

  get getManagerMenu(): IManagerMenuItem[] {
    return this.managerMenu$.value;
  }

  activeRouter(activeIndex: number) {
    const _menu = this.menu$.value.map((menu, index) => {
      const active = activeIndex === index;
      return {
        ...menu,
        active: active
      }
    });
    this.menu$.next(_menu);
  }

  scrollBody(scroll: boolean) {
    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      const currentCls = bodyElement.className;
      if (scroll) {
        bodyElement.className = `${currentCls.replace(this.hiddenScrollCls, '')}`;
      } else {
        bodyElement.className = `${currentCls} ${this.hiddenScrollCls}`;
      }
    } else {
      console.error('body element does not exist')
    }
  }
}
