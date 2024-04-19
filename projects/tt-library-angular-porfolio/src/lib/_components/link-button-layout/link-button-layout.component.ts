import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { htmlATagTarget } from '../../_enums';

@Component({
  selector: 'tt-link-button-layout',
  templateUrl: './link-button-layout.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class LinkButtonLayoutComponent implements OnInit {
  @Input() type: 'href' | 'download' = 'href';
  @Input() customCls: string = '';
  @Input() href: string = '';
  @Input() target: htmlATagTarget = '_blank';

  constructor() { }

  ngOnInit() {
  }

}

