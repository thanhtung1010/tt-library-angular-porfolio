import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, Subscriber } from "rxjs";
import { FirebaseService } from ".";
import { FIRESTORE_COLLECTION } from "../../../_enums";
import { IBaseBMR, IBaseCustomerInfo, IBaseInfor, IBaseLBM, IBaseWinfitOnlineData } from "../../../_interfaces";
import { AppUserModel, BaseIndexWinfitModel } from "../_models";
import { BASE_WINFIT_ONLINE_DATA } from "../../../_enums/winfit-online.enum";

@Injectable({
  providedIn: 'root'
})

export class WinfitOnlineService {
  private _baseIndexWinfit: BaseIndexWinfitModel = new BaseIndexWinfitModel(null);
  baseIndexWinfit$: Subject<BaseIndexWinfitModel> = new Subject();
  baseWinfitOnlineData$: BehaviorSubject<IBaseWinfitOnlineData> = new BehaviorSubject(BASE_WINFIT_ONLINE_DATA);

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
    this._baseIndexWinfit.bodyFatIndex = baseInfor.bodyFatIndex;
    this._baseIndexWinfit.visceralFatIndex = baseInfor.visceralFatIndex;
    this._baseIndexWinfit.skeletalMusclesIndex = baseInfor.skeletalMusclesIndex;
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

  set setLBM(lbm: IBaseLBM) {
    this._baseIndexWinfit.lbm = lbm;
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
    this.checkActiveBaseData();
    this.baseIndexWinfit$.next(this._baseIndexWinfit);
  }

  callApplyBaseData(baseData: IBaseWinfitOnlineData) {
    this.baseWinfitOnlineData$.next(baseData);
  }

  checkActiveBaseData() {
    const currentBaseData = this.baseWinfitOnlineData$.value;

    for (const field in currentBaseData) {
      const _field: keyof IBaseWinfitOnlineData = field as keyof IBaseWinfitOnlineData;
      let currentDataByField: any[] = currentBaseData[_field];

      switch (_field) {
        case 'baseMBRData':
          currentDataByField = currentDataByField.map(elm => {
            elm.active = this._baseIndexWinfit.age >= elm.ageFrom && this._baseIndexWinfit.age <= elm.ageTo;
            return elm;
          });
          break;
        case 'baseMBIData':
          currentDataByField = currentDataByField.map(elm => {
            elm.active = this._baseIndexWinfit.bmi >= elm.bmiFrom && this._baseIndexWinfit.bmi <= elm.bmiTo;
            return elm;
          });
          break;
        case 'baseBodyFatData':
          currentDataByField = currentDataByField.map(elm => {
            if (this._baseIndexWinfit.gender) {
              elm.active = this._baseIndexWinfit.bodyFatIndex >= elm.indexForManFrom && this._baseIndexWinfit.bodyFatIndex <= elm.indexForManTo;
            } else {
              elm.active = this._baseIndexWinfit.bodyFatIndex >= elm.indexForWomanFrom && this._baseIndexWinfit.bodyFatIndex <= elm.indexForWomanTo;
            }
            return elm;
          });
          break;
        case 'baseSkeletalMusclesData':
          currentDataByField = currentDataByField.map(elm => {
            if (this._baseIndexWinfit.gender) {
              elm.active = this._baseIndexWinfit.skeletalMusclesIndex >= elm.manFrom && this._baseIndexWinfit.skeletalMusclesIndex <= elm.manTo;
            } else {
              elm.active = this._baseIndexWinfit.skeletalMusclesIndex >= elm.womanFrom && this._baseIndexWinfit.skeletalMusclesIndex <= elm.womanTo;
            }
            return elm;
          });
          break;
        case 'baseVisceralFatData':
          currentDataByField = currentDataByField.map(elm => {
            elm.active = this._baseIndexWinfit.visceralFatIndex >= elm.levelVisceralFatFrom && this._baseIndexWinfit.visceralFatIndex <= elm.levelVisceralFatTo;
            return elm;
          });
          break;

        default:
          break;
      }

      currentBaseData[_field] = currentDataByField;
    }

    this.callApplyBaseData(currentBaseData);
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

    this.baseIndexWinfit.lbm = this.calcLBM(baseInfor);
    const lbm = this.baseIndexWinfit.lbm.index && !Number.isNaN(this.baseIndexWinfit.lbm.index) ? this.baseIndexWinfit.lbm.index : null;
    if (lbm) {
      katchMcArdle = +(370 + (21.6 * lbm)).toFixed(2);
    }

    this.setBMR = {
      harrisBenedict: +harrisBenedict.toFixed(2),
      mifflinStJeor: +mifflinStJeor.toFixed(2),
      katchMcArdle
    };
  }

  private calcLBM (baseInfo: IBaseInfor): IBaseLBM {
    let index: number = NaN;
    let boer: number = NaN;
    let james: number = NaN;
    let hume: number = NaN;
    const weight = baseInfo.weightIndex;
    const height = baseInfo.heightIndex;

    if (baseInfo.gender) {
      boer = (0.407 * weight) + (0.267 * height) - 19.2;
      james = (1.1 * weight) - 128 * Math.pow(weight / height, 2);
      hume = (0.32810 * weight) + (0.33929 * height) - 29.5336;
    } else {
      boer = (0.252 * weight) + (0.473 * height) - 48.3;
      james = (1.07 * weight) - 148 * Math.pow(weight / height, 2);
      hume = (0.29569 * weight) + (0.41813 * height) - 43.2933;
    }

    if (baseInfo.bodyFatIndex) {
      index = weight - ((weight * baseInfo.bodyFatIndex) / 100);
    }

    return {
      boer: +boer.toFixed(2),
      james: +james.toFixed(2),
      hume: +hume.toFixed(2),
      index
    }
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
