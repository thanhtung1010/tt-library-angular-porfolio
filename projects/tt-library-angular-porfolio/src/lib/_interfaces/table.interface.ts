import { ANT_TABLE_ELEMENT_FIELD_TYPE } from "../_enums";

export interface IAntTableElement<T> {
  field: T;
  title: string;

  fieldType?: ANT_TABLE_ELEMENT_FIELD_TYPE;

  child?: IAntTableElement<T>[];
  index?: number;
  sortField?: string;
  get?: Function;
  colSpan?: number;
  rowSpan?: number;
  translateTitle?: boolean;
  width: number | string | null;
  align?: 'center' | 'right' | 'left';
  padding?: string;

  isUnix?: boolean;

  value?: any;
  show?: boolean;
  notAllowHide?: boolean;
  showCCOrAdmin?: boolean;
  showBum?: boolean;
  sortOrder?: string;
  isHide?: boolean;
  isLock?: boolean;
  country?: string;
  separator?: string; // Specifies a string to separate each pair of adjacent elements of the array - fieldType = array
}

export interface ITableLayoutProps {
  data?: any[];
  expandFilter?: boolean;
  showExpand?: boolean;
  showReset?: boolean;
  showRefresh?: boolean;
  showExportExcel?: boolean;
  showDefaultButtons?: boolean;
  showSummarize?: boolean;
  showPagination?: boolean;
  minWidth?: number;
  maxHeight?: string;
  no_data_msg?: string;
  showTable?: boolean;
  param?: IApiBaseMeta;
  alertReset?: boolean;
  nzWidthConfig?: string[];
  nzPageSizeOptions?: number[];
}

export interface IApiBaseMeta {
  // updatedAt?: number;
  // sort?: any[];
  // filter?: any[];

  pageNumber: number,
  pageSize: number;
  totalPages: number;
  totalElements?: number;
}
