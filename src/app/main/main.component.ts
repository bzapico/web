import { Component, OnInit } from '@angular/core';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nalej-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Initialized mock to true until there is a backend to be called
    localStorage.setItem(LocalStorageKeys.infrastructureMock, 'true');
  }

}
