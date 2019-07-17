import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contextual-menu',
  templateUrl: './contextual-menu.component.html',
  styleUrls: ['./contextual-menu.component.scss']
})
export class ContextualMenuComponent implements OnInit {

  innerClick: boolean;

  constructor() {}

  @Input() visible: boolean;
  @Input() options: any[];
  @Output() closed = new EventEmitter<boolean>();

  ngOnInit() {}

  onClick(option) {
    option.action(option.item);
  }

  @HostListener('click')
  onclickin() {
    this.innerClick = true;
  }

  @HostListener('document:click')
  onclickout() {
    if (this.visible && !this.innerClick) {
      this.closed.emit(false);
    }
    this.innerClick = false;
  }
}
