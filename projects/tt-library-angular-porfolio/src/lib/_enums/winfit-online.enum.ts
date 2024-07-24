import { IBaseWinfitOnlineData } from "../_interfaces";

export const BASE_WINFIT_ONLINE_DATA: IBaseWinfitOnlineData = {
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
      type: 'TABLE.LOW',
      womanFrom: 5,
      womanTo: 26,
      manFrom: 5,
      manTo: 33,
    },
    {
      type: 'TABLE.NORMAL',
      womanFrom: 26,
      womanTo: 29,
      manFrom: 33,
      manTo: 37,
    },
    {
      type: 'TABLE.GOOD',
      womanFrom: 29,
      womanTo: 31,
      manFrom: 37,
      manTo: 40,
    },
    {
      type: 'TABLE.VERY_GOOD',
      womanFrom: 31,
      womanTo: 60,
      manFrom: 40,
      manTo: 60,
    },
  ],
};
