import { Injectable } from "@angular/core";
import { Observable, Subject, Subscriber } from "rxjs";
import { FirebaseService } from ".";
import { FIRESTORE_COLLECTION } from "../../../_enums";
import { IBaseBMR, IBaseCustomerInfo, IBaseInfor, IBaseWinfitOnlineData } from "../../../_interfaces";
import { AppUserModel, BaseIndexWinfitModel } from "../_models";

@Injectable({
  providedIn: 'root'
})

export class WinfitOnlineService {
  private _baseIndexWinfit: BaseIndexWinfitModel = new BaseIndexWinfitModel(null);
  baseIndexWinfit$: Subject<BaseIndexWinfitModel> = new Subject();
  baseWinfitOnlineData: IBaseWinfitOnlineData = {
    baseMBRData: [
      {
        ageFrom: 10,
        ageTo: 11,
        bmr: NaN,
        manBMR: 37.4,
        womanBMR: 34.8,
      },
      {
        ageFrom: 12,
        ageTo: 14,
        bmr: NaN,
        manBMR: 31,
        womanBMR: 29.6,
      },
      {
        ageFrom: 15,
        ageTo: 17,
        bmr: NaN,
        manBMR: 27,
        womanBMR: 25.3,
      },
      {
        ageFrom: 18,
        ageTo: 29,
        bmr: NaN,
        manBMR: 24,
        womanBMR: 22.1,
      },
      {
        ageFrom: 30,
        ageTo: 49,
        bmr: NaN,
        manBMR: 22.3,
        womanBMR: 21.7,
      },
      {
        ageFrom: 50,
        ageTo: 69,
        bmr: NaN,
        manBMR: 21.5,
        womanBMR: 20.7,
      },
      {
        ageFrom: 70,
        ageTo: NaN,
        bmr: NaN,
        manBMR: 21.5,
        womanBMR: 20.7,
      },
    ],
    baseMBIData: [
      {
        bmiFrom: 2.5,
        bmiTo: 18.4,
        bmi: NaN,
        type: 'TABLE.UNDERWEIGHT',
      },
      {
        bmiFrom: 18.5,
        bmiTo: 22.9,
        bmi: NaN,
        type: 'TABLE.BALANCE',
      },
      {
        bmiFrom: 23,
        bmiTo: 24.9,
        bmi: NaN,
        type: 'TABLE.OVERWEIGHT',
      },
      {
        bmiFrom: 25,
        bmiTo: 29.9,
        bmi: NaN,
        type: 'TABLE.OBESITY',
      },
      {
        bmiFrom: 30,
        bmiTo: 50,
        bmi: NaN,
        type: 'TABLE.DANGEROUS_OBESITY',
      },
    ],
    baseBodyFatData: [
      {
        indexForManFrom: 3,
        indexForManTo: 10,
        indexForWomanFrom: 12,
        indexForWomanTo: 18,
        type: 'TABLE.FITNESS',
      },
      {
        indexForManFrom: 10,
        indexForManTo: 20,
        indexForWomanFrom: 18,
        indexForWomanTo: 28,
        type: 'TABLE.BALANCE',
      },
      {
        indexForManFrom: 20,
        indexForManTo: 25,
        indexForWomanFrom: 28,
        indexForWomanTo: 32,
        type: 'TABLE.HIGH',
      },
      {
        indexForManFrom: 25,
        indexForManTo: NaN,
        indexForWomanFrom: 32,
        indexForWomanTo: NaN,
        type: 'TABLE.VERY_HIGH',
      },
    ],
    baseVisceralFatData: [
      {
        levelVisceralFatFrom: 1,
        levelVisceralFatTo: 3,
        type: 'TABLE.GOOD',
      },
      {
        levelVisceralFatFrom: 3,
        levelVisceralFatTo: 9,
        type: 'TABLE.HIGH',
      },
      {
        levelVisceralFatFrom: 10,
        levelVisceralFatTo: 14,
        type: 'TABLE.DANGER',
      },
      {
        levelVisceralFatFrom: 15,
        levelVisceralFatTo: 30,
        type: 'TABLE.VERY_DANGER',
      },
    ],
    baseSkeletalMusclesData: [
      {
        for: 'TABLE.WOMAN',
        lowFrom: 5,
        lowTo: 26,
        normalFrom: 26,
        normalTo: 29,
        goodFrom: 29,
        goodTo: 31,
        veryGoodFrom: 31,
        veryGoodTo: 60,
      },
      {
        for: 'TABLE.MAN',
        lowFrom: 5,
        lowTo: 33,
        normalFrom: 33,
        normalTo: 37,
        goodFrom: 37,
        goodTo: 40,
        veryGoodFrom: 40,
        veryGoodTo: 60,
      },
    ],
  };

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

  set setIndexWinfit(index: BaseIndexWinfitModel) {
    this._baseIndexWinfit = index;
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

  set setCustomerInfo(customer: IBaseCustomerInfo) {
    this._baseIndexWinfit.customerName = customer.customerName || '';
    this._baseIndexWinfit.customerEmail = customer.customerEmail || '';
    this._baseIndexWinfit.customerPhoneNumber = customer.customerPhoneNumber || '';
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
  saveWinfit(id: string): Observable<boolean> {
    return new Observable<boolean>((subs: Subscriber<boolean>) => {
      if (!id) {
        subs.next(false);
        subs.complete();
      } else {
        const indexWinfit = this._baseIndexWinfit.getData;
        const _data = {
          userID: id,
          ...indexWinfit,
          customerPhoneNumber:'+84' + indexWinfit['customerPhoneNumber'],
        };
        this.fireBaseService.addNewDocument(FIRESTORE_COLLECTION.WINFIT_ONLINE, _data).subscribe({
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
      }
    });
  }
  deleteWinfit(id: string): Observable<boolean> {
    return new Observable<boolean>((subs: Subscriber<boolean>) => {
      const indexWinfit = this._baseIndexWinfit.getData;
      const _data = {
        ...indexWinfit,
        customerPhoneNumber:'+84' + indexWinfit['customerPhoneNumber'],
      };
      this.fireBaseService.updateDocument(FIRESTORE_COLLECTION.WINFIT_ONLINE, id, _data).subscribe({
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
