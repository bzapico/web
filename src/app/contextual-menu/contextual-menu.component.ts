/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// tslint:disable:no-any
import { Component, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contextual-menu',
  templateUrl: './contextual-menu.component.html',
  styleUrls: ['./contextual-menu.component.scss']
})
export class ContextualMenuComponent {

  innerClick: boolean;

  constructor() {}

  @Input() visible: boolean;
  @Input() options: {action: any, item: any, name: string}[];
  @Output() closed = new EventEmitter<boolean>();

  onClick(option) {
    option.action(option.item);
  }

  @HostListener('click')
  onClickIn() {
    this.innerClick = true;
  }

  @HostListener('document:click')
  onClickOut() {
    if (this.visible && !this.innerClick) {
      this.closed.emit(false);
    }
    this.innerClick = false;
  }
}
