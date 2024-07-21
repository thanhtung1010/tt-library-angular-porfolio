export interface IBaseInfor {
  age: number;
  gender: boolean;
  heightIndex: number;
  weightIndex: number;
  lbm?: number;
}

export interface ICalcIndexWinfit extends IBaseCustomerInfo {
  age: number;
  gender: boolean;
  heightIndex: number;
  weightIndex: number;
  bmr?: IBaseBMR;
  bmi?: number;
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

export interface IBaseSkeletalMusclesData {
  for: string;
  lowFrom: number;
  lowTo: number;
  normalFrom: number;
  normalTo: number;
  goodFrom: number;
  goodTo: number;
  veryGoodFrom: number;
  veryGoodTo: number;
}

export interface IBaseVisceralFatData {
  levelVisceralFatFrom: number;
  levelVisceralFatTo: number;
  type: string;
}

export interface IBaseBodyFatData {
  indexForManFrom: number;
  indexForManTo: number;
  indexForWomanFrom: number;
  indexForWomanTo: number;
  type: string;
}

export interface IBaseMBIData {
  bmiFrom: number;
  bmiTo: number;
  bmi: number;
  type: string;
}

export interface IBaseMBRData {
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
