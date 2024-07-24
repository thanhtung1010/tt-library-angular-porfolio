import { IBaseBMR, IBaseLBM, ICalcIndexWinfit } from "../../../_interfaces";

export class BaseIndexWinfitModel {
  gender: boolean = false;
  age: number = NaN;
  heightIndex: number = NaN;
  weightIndex: number = NaN;
  bmr: IBaseBMR = {
    harrisBenedict: NaN,
    mifflinStJeor: NaN,
    katchMcArdle: NaN,
  };
  bmi: number = NaN;
  lbm: IBaseLBM = {
    index: NaN,
    boer: NaN,
    james: NaN,
    hume: NaN,
  };
  bodyFatIndex: number = NaN;
  visceralFatIndex: number = NaN;
  skeletalMusclesIndex: number = NaN;
  waterNeeded: number = NaN;
  fullName: string = '';
  email: string = '';
  phoneNumber: string = '';
  customerName: string = '';
  customerEmail: string = '';
  customerPhoneNumber: string = '';

  constructor(baseInfo: ICalcIndexWinfit | null) {
    if (baseInfo) {
      this.checkForString('fullName', baseInfo.fullName);
      this.checkForString('email', baseInfo.email);
      this.checkForString('phoneNumber', baseInfo.phoneNumber);
      this.checkForString('customerName', baseInfo.customerName);
      this.checkForString('customerEmail', baseInfo.customerEmail);

      this.checkPhoneNumber(baseInfo.customerPhoneNumber || '');

      this.checkForBoolean('gender', baseInfo.gender);

      this.checkForNumber('age', baseInfo.age);
      this.checkForNumber('heightIndex', baseInfo.heightIndex);
      this.checkForNumber('weightIndex', baseInfo.weightIndex);
      this.checkForNumber('bmi', baseInfo.bmi);
      this.checkForNumber('waterNeeded', baseInfo.waterNeeded);
      this.checkForNumber('bodyFatIndex', baseInfo.bodyFatIndex);
      this.checkForNumber('visceralFatIndex', baseInfo.visceralFatIndex);
      this.checkForNumber('skeletalMusclesIndex', baseInfo.skeletalMusclesIndex);

      if (typeof baseInfo['bmr'] === 'object') {
        this.bmr = baseInfo['bmr'];
      }

      if (typeof baseInfo['lbm'] === 'object') {
        this.lbm = baseInfo['lbm'];
      }
    }
  }

  private checkPhoneNumber(value: string) {
    if (typeof value === 'string' && value.includes('+84')) {
      this.customerPhoneNumber = value.replace('+84', '');
    } else {
      this.customerPhoneNumber = value;
    }
  }

  private checkForString(
    param:
      | 'fullName'
      | 'email'
      | 'phoneNumber'
      | 'customerName'
      | 'customerEmail',
    value: any
  ) {
    if (typeof value === 'string') {
      this[param] = value;
    } else {
      this[param] = '';
    }
  }

  private checkForBoolean(param: 'gender', value: any) {
    if (value !== undefined) {
      if (typeof value === 'boolean') {
        this[param] = value;
      } else {
        this[param] = value === 'true';
      }
    }
  }

  private checkForNumber(
    param:
      | 'age'
      | 'heightIndex'
      | 'weightIndex'
      | 'bmi'
      | 'waterNeeded'
      | 'skeletalMusclesIndex'
      | 'visceralFatIndex'
      | 'bodyFatIndex',
    value: any
  ) {
    const valueType = typeof value;
    switch (valueType) {
      case 'number':
        this[param] = value;
        break;

      case 'string':
        this[param] = +value;
        break;

      default:
        this[param] = NaN;
        break;
    }
  }

  get getData(): Record<string, any> {
    return {
      ...this,
    };
  }
}
