import { Injectable } from "@angular/core";
import { AppUserModel, BaseIndexWinfitModel } from "../_models";
import { BehaviorSubject, Observable, of, Subscriber } from "rxjs";
import { IBaseBMR, IBaseInfor, IFirestoreCustomerWinfitOnline, IFirestoreUser, IFirestoreWinfitOnline } from "../../../_interfaces";
import { FirebaseService } from ".";
import { FIRESTORE_COLLECTION } from "../../../_enums";

@Injectable({
  providedIn: 'root'
})

export class WinfitOnlineService {
  private _baseIndexWinfit: BaseIndexWinfitModel = new BaseIndexWinfitModel(null);
  baseIndexWinfit$: BehaviorSubject<BaseIndexWinfitModel> = new BehaviorSubject(new BaseIndexWinfitModel(null));

  constructor(
    private fireBaseService: FirebaseService,
  ) {}

  get baseIndexWinfit(): BaseIndexWinfitModel {
    return this._baseIndexWinfit;
  }

  set baseIndexWinfit(baseInfor: IBaseInfor) {
    this._baseIndexWinfit.age = baseInfor.age;
    this._baseIndexWinfit.gender = baseInfor.gender;
    this._baseIndexWinfit.heightIndex = baseInfor.heightIndex;
    this._baseIndexWinfit.weightIndex = baseInfor.weightIndex;
    this.callApply();
  }

  set setBMR(bmr: IBaseBMR) {
    this._baseIndexWinfit.bmr = {
      harrisBenedict: bmr.harrisBenedict,
      mifflinStJeor: bmr.mifflinStJeor,
      katchMcArdle: bmr.katchMcArdle,
    };
    this.callApply();
  }

  set setBMI(bmi: number) {
    this._baseIndexWinfit.bmi = bmi;
    this.callApply();
  }

  set setWaterNeeded(waterNeeded: number) {
    this._baseIndexWinfit.waterNeeded = waterNeeded;
    this.callApply();
  }

  set setUserInfo(user: AppUserModel) {
    this._baseIndexWinfit.email = user.email;
    this._baseIndexWinfit.fullName = user.displayName;
    this._baseIndexWinfit.phoneNumber = user.phoneNumber;
    this.callApply();
  }

  callApply() {
    this._baseIndexWinfit = new BaseIndexWinfitModel(this._baseIndexWinfit);
    this.baseIndexWinfit$.next(this._baseIndexWinfit);
  }

  calcBMR(baseInfor: IBaseInfor) {
    let harrisBenedict: number = NaN;
    let mifflinStJeor: number = NaN;
    let katchMcArdle: number = NaN;

    if (baseInfor.gender) {
      harrisBenedict = 66 + (13.7 * baseInfor.weightIndex) + (5 * baseInfor.heightIndex) + (6.8 * baseInfor.age);
      mifflinStJeor = (10 * baseInfor.weightIndex) + (6.25 * baseInfor.heightIndex) - (5 * baseInfor.age) + 5;
    } else {
      harrisBenedict = 655 + (9.6 * baseInfor.weightIndex) + (1.8 * baseInfor.heightIndex) + (4.7 * baseInfor.age);
      mifflinStJeor = (10 * baseInfor.weightIndex) + (6.25 * baseInfor.heightIndex) - (5 * baseInfor.age) - 161;
    }
    if (baseInfor.lbm) {
      katchMcArdle = +(370 + (21.6 * baseInfor.lbm)).toFixed(2);
    }
    this.setBMR = {
      harrisBenedict: +harrisBenedict.toFixed(2),
      mifflinStJeor: +mifflinStJeor.toFixed(2),
      katchMcArdle
    };
  }

  calcBMI(baseInfor: IBaseInfor) {
    const height = baseInfor.heightIndex / 100;

    const bmi: number = baseInfor.weightIndex / Math.pow(height, 2);
    this.setBMI = +bmi.toFixed(2);
  }

  calcWaterNeeded(baseInfor: IBaseInfor) {
    const waterNeeded: number = (baseInfor.weightIndex * 0.03) + 0.5;
    this.setWaterNeeded = +waterNeeded.toFixed(2);
  }

  //#region firebase
  saveWinfit(customerInfo?: IFirestoreCustomerWinfitOnline): Observable<boolean> {
    if (!customerInfo) {
      return of(false);
    }

    return new Observable<boolean>((subs: Subscriber<boolean>) => {
      const data: IFirestoreWinfitOnline = {
        ...customerInfo,
        ...this.baseIndexWinfit,
      };
      this.fireBaseService.addNewDocument(FIRESTORE_COLLECTION.WINFIT_ONLINE, data).subscribe({
        next: resp => {
          subs.next(resp);
          subs.complete();
        },
        error: error => {
          console.error(error);
          subs.next(false);
          subs.complete();
        },
      });
    });
  }
}
