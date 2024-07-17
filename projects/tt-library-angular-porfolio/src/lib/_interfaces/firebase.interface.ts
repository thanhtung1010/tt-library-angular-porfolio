import { IBaseBMR } from ".";

export interface IFirestoreUser {
  uuid: string;
  email: string;
  phone_number: string;
  permission: string;
  full_name: string;
}

export interface IFirestoreCustomerWinfitOnline {
  userID: string;
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
}

export interface IFirestoreWinfitOnline extends IFirestoreCustomerWinfitOnline {
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
