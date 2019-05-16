import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contextual-menu',
  templateUrl: './contextual-menu.component.html',
  styleUrls: ['./contextual-menu.component.scss']
})
export class ContextualMenuComponent implements OnInit {

  constructor() { }

  @Input() visible: boolean;
  options: string[];

  ngOnInit() {
  }

}
