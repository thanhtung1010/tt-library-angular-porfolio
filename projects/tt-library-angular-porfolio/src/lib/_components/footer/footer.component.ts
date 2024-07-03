import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AssetsLink } from '../../_pipes';
import { LinkButtonLayoutComponent } from '../link-button-layout/link-button-layout.component';
import { LogoComponent } from '../logo/logo.component';
import { VersionComponent } from '../version/version.component';
import { ISocialNetwork } from '../../_interfaces';
import { AppConfigService, CommonService } from '../../_modules/shared/_services';

@Component({
  selector: 'tt-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [
    CommonModule,
    AssetsLink,
    LinkButtonLayoutComponent,
    TranslateModule,
    LogoComponent,
    VersionComponent,
  ]
})
export class FooterComponent implements OnInit {
  env = this.appConfig.appConfig;
  socialNetworks: ISocialNetwork[] = [
    {
      name: 'facebook-logo',
      type: 'svg',
      href: 'https://www.facebook.com/trinh.thanhtung.967',
      action: 'url',
    },
    {
      name: 'instagram-logo',
      type: 'svg',
      href: 'https://www.instagram.com/trinhthanhtung1010/',
      action: 'url',
    },
    {
      name: 'linkedin-logo',
      type: 'svg',
      href: 'https://www.linkedin.com/in/tung-trinh-frontend',
      action: 'url',
    },
    {
      name: 'skype-logo',
      type: 'svg',
      action: 'copy',
      content: 'live:trinhthanhtung1010'
    },
    {
      name: 'github-logo',
      type: 'svg',
      href: 'https://www.github.com/thanhtung1010',
      action: 'url',
    },
  ];

  constructor(
    private commonSer: CommonService,
    private appConfig: AppConfigService,
  ) { }

  ngOnInit() {
  }

  copyContent(content: any) {
    this.commonSer.copyToClipboard(content, {success: 'MESSAGE.SKYPE_ID_COPY_SUCCESS', error: 'MESSAGE.SOMTHING_WAS_WRONG'});
  }

}
