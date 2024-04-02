import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'tt-empty',
  templateUrl: './empty.component.html'
})
export class EmptyComponent implements OnInit {
  @Input() nzNotFoundImage: string | TemplateRef<void> = '';
  @Input() nzNotFoundContent: string | TemplateRef<void> = '';
  @Input() customCls: string = '';

  constructor() { }

  ngOnInit() {
  }

}
