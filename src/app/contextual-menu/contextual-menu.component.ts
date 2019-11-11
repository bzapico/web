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
