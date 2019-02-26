import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { BsModalRef } from 'ngx-bootstrap';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  selector: 'app-register-application',
  templateUrl: './register-application.component.html',
  styleUrls: ['./register-application.component.scss']
})
export class RegisterApplicationComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization id
   */
  organizationId: string;

  /**
   *  Reference to the drop area so we can attach some events to it
   * */
  dropArea: any;

  private preventAndStop(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.registerAppMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.dropArea = document.getElementById('drop-area');
  }

  ngOnInit() {
    console.log(this.dropArea);
  }

  /**
 * Drop file
 */
  handelFiles() {
    const dropArea = document.getElementById('drop-area');
    const dropEventsArray = ['dragenter', 'dragover', 'dragleave', 'drop'];
    console.log(dropEventsArray);

    // dropArea.addEventListener('dragenter', handlerFunction, false);
    // dropArea.addEventListener('dragleave', handlerFunction, false);
    // dropArea.addEventListener('dragover', handlerFunction, false);
    // dropArea.addEventListener('drop', handlerFunction, false);
    dropEventsArray.forEach(eventName => {
        // dropArea.addEventListener(eventName, this.preventDefaults(), false);
    });

  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  highlight(e) {

    this.dropArea.classList.add('highlight');
  }
  unhighlight(e) {

    this.dropArea.classList.remove('highlight');
  }

  /**
   * Register the app
   */
  registerApp() {

  }

  /**
   * Checks if the form has been modified before discarding changes
   */
  discardChanges() {
    this.bsModalRef.hide();
  }


}
