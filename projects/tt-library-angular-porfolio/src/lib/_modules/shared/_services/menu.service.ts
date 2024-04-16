import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MENU } from "../../../_enums";
import { IMenuItem } from "../../../_interfaces";

@Injectable({
  providedIn: "root"
})

export class MenuService {

  menu$: BehaviorSubject<Array<IMenuItem>> = new BehaviorSubject([] as Array<IMenuItem>);
  toggleVisibleMenu$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  hiddenScrollCls: string = 'tt-hidden_scroll';

  constructor() {}

  init() {
    const _menu = MENU.filter(menuItem => menuItem.show).map(menu => {
      return {
        ...menu,
        active: location.pathname === menu.href,
      }
    });
    this.menu$.next(_menu);
  }

  get getMenu(): IMenuItem[] {
    return this.menu$.value;
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
