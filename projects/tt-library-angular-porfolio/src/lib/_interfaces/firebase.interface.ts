import { IBaseBMR } from ".";

export interface IFirestoreDocument {
  firebaseID?: string;
}

export interface IFirestoreUser extends IFirestoreDocument {
  uuid: string;
  email: string;
  phone_number: string;
  permission: string;
  full_name: string;
}

export interface IFirestoreCustomerWinfitOnline {
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
}

export interface IFirestoreWinfitOnline extends IFirestoreCustomerWinfitOnline, IFirestoreDocument {
  gender: boolean;
  age: number;
  heightIndex: number;
  weightIndex: number;
  bmr: IBaseBMR;
  bmi: number;
  waterNeeded: number;
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface IFirestoreSearchDocument {
  field: string;
  value: any
}
