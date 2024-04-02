import { Component, EventEmitter, Input, OnChanges, Output, TemplateRef } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IApiBaseMeta, ITableLayoutProps } from '../../../../_interfaces';
import { AppConfigService } from '../../_services/app-config.service';

@Component({
  selector: 'tt-table-layout',
  templateUrl: './table-layout.component.html'
})
export class TableLayoutComponent implements OnChanges {
  @Input() props: ITableLayoutProps | undefined;
  @Input() loading: boolean = true;
  @Input() allowFilter: boolean = true;
  @Input() expandFilter: boolean = false;

  @Input() nzLoadingIndicator!: TemplateRef<any>;

  @Output() oReset: EventEmitter<any> = new EventEmitter(undefined);
  @Output() oRefresh: EventEmitter<any> = new EventEmitter(undefined);
  @Output() oToggleExpand: EventEmitter<any> = new EventEmitter(undefined);
  @Output() oChangeParams: EventEmitter<any> = new EventEmitter(undefined);

  showFilterMb = false;
  list: any[] = [];
  defaultPageSize: number = this.appConfigService.appConfig?.defaultPageSize || 10;
  currentParams: IApiBaseMeta = {
    totalPages: 0,
    pageNumber: 0,
    pageSize: this.defaultPageSize,
  };
  stateProps: ITableLayoutProps = {
    data: [],
    expandFilter: false,
    showExpand: false,
    showTable: true,
    showReset: true,
    showRefresh: true,
    showExportExcel: true,
    showDefaultButtons: true,
    showPagination: true,
    maxHeight: '',
    minWidth: -1,
    no_data_msg: 'error.NO_DATA',
    param: { ...this.currentParams },
    alertReset: false,
    nzWidthConfig: [],
  };
  // expandFilter = false;
  column = {
    left: 16,
    right: 8,
  };

  constructor(private appConfigService: AppConfigService) {}

  ngOnChanges() {
    if (this.props) {
      this.stateProps = Object.assign(this.stateProps, this.props);
    }
    this.list = this.stateProps['data']
      ? this.stateProps.data.map((item) => Object.assign({}, item))
      : [];
    if (this.stateProps.param) {
      this.currentParams = this.stateProps.param;
    }
  }

  //#region Output Emit event
  onQueryParamsChange(evt: NzTableQueryParams | number, type: string) {
    let _params: IApiBaseMeta = { ...(this.currentParams as any) };
    switch (type) {
      case 'table':
        _params.pageNumber = (evt as NzTableQueryParams).pageIndex;
        _params.pageSize =
          (evt as NzTableQueryParams).pageSize < this.defaultPageSize
            ? this.defaultPageSize
            : (evt as NzTableQueryParams).pageSize;
        // if ((evt as NzTableQueryParams).filter.length > 0) {
        //   _params.filter = (evt as NzTableQueryParams).filter;
        // }
        // if ((evt as NzTableQueryParams).sort.length > 0) {
        //   _params.sort = (evt as NzTableQueryParams).sort;
        // }
        break;
      case 'size':
        _params.pageSize = evt as number;
        _params.pageNumber = 1;
        break;
      default:
        _params.pageNumber = evt as number;
        break;
    }
    if (JSON.stringify(_params) !== JSON.stringify(this.currentParams)) {
      this.currentParams = { ..._params };
      this.oChangeParams.emit(this.currentParams);
    }
  }
  onReload() {
    this.oReset.emit(this.currentParams);
  }
  onRefresh() {
    this.oRefresh.emit(this.currentParams);
  }
  onToggleExpand() {
    this.expandFilter = !this.expandFilter;
    this.oToggleExpand.emit(this.expandFilter);
  }
  //#endregion
}
