import { Component, OnInit } from '@angular/core';
import { LinkButtonLayoutComponent } from '../link-button-layout/link-button-layout.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AssetsLink } from '../../_pipes';
import { EmptyComponent } from '../empty/empty.component';
import { ROUTE } from '../../_enums';
import { Title } from '@angular/platform-browser';

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
  route = ROUTE;
  titleSEO: string = 'SEO.TITLE_NOT_FOUND';

  constructor(
    private titleService: Title,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.translateService.get(this.titleSEO).subscribe(resp => {
      this.titleService.setTitle(resp);
    });
  }

}
