import { Component, OnInit } from '@angular/core';
import { LinkButtonLayoutComponent } from '../link-button-layout/link-button-layout.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
import { AssetsLink } from '../../_pipes';
import { EmptyComponent } from '../empty/empty.component';

@Component({
  selector: 'tt-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  imports: [
    AssetsLink,
    LinkButtonLayoutComponent,
    NzButtonModule,
    TranslateModule,
    EmptyComponent,
  ],
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
