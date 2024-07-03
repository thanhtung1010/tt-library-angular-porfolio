import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tt-version',
  templateUrl: './version.component.html',
  standalone: true,
  imports: [
    TranslateModule,
  ]
})
export class VersionComponent implements OnInit {
  @Input() showDescription: boolean = true;
  @Input() showVersion: boolean = true;

  currentVersion: string = '';

  constructor() { }

  ngOnInit() {}

}
