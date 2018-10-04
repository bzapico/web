import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
    // So far we need mocked up views until we have the backend integration ready
    // localStorage.setItem(LocalStorageKeys.loginMock, 'true');
  }
}
