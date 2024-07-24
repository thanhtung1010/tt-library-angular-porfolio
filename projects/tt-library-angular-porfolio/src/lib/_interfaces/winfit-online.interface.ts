export interface IBaseInfor {
  age: number;
  gender: boolean;
  heightIndex: number;
  weightIndex: number;
  bodyFatIndex: number;
  visceralFatIndex: number;
  skeletalMusclesIndex: number;
}

export interface ICalcIndexWinfit extends IBaseCustomerInfo {
  age: number;
  gender: boolean;
  heightIndex: number;
  weightIndex: number;
  bmr?: IBaseBMR;
  bmi?: number;
  lbm?: IBaseLBM;
  bodyFatIndex?: number;
  visceralFatIndex?: number;
  skeletalMusclesIndex?: number;
  waterNeeded?: number;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface IBaseCustomerInfo {
  customerName?: string;
  customerEmail?: string;
  customerPhoneNumber?: string;
}

export interface IBaseBMR {
  harrisBenedict: number;
  mifflinStJeor: number;
  katchMcArdle?: number;
}

export interface IBaseLBM {
  index?: number;
  boer: number;
  james: number;
  hume: number;
}

export interface ICommonBaseData {
  active?: boolean;
}

export interface IBaseSkeletalMusclesData extends ICommonBaseData {
  type: string;
  manFrom: number;
  manTo: number;
  womanFrom: number;
  womanTo: number;
}

export interface IBaseVisceralFatData extends ICommonBaseData {
  levelVisceralFatFrom: number;
  levelVisceralFatTo: number;
  type: string;
}

export interface IBaseBodyFatData extends ICommonBaseData {
  indexForManFrom: number;
  indexForManTo: number;
  indexForWomanFrom: number;
  indexForWomanTo: number;
  type: string;
}

export interface IBaseMBIData extends ICommonBaseData {
  bmiFrom: number;
  bmiTo: number;
  bmi: number;
  type: string;
}

export interface IBaseMBRData extends ICommonBaseData {
  ageFrom: number;
  ageTo: number;
  bmr: number;
  manBMR: number;
  womanBMR: number;
}

export interface IBaseWinfitOnlineData {
  baseMBRData: IBaseMBRData[]
  baseMBIData: IBaseMBIData[]
  baseBodyFatData: IBaseBodyFatData[]
  baseVisceralFatData: IBaseVisceralFatData[]
  baseSkeletalMusclesData: IBaseSkeletalMusclesData[]
}
