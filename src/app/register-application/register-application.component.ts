import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { NotificationsService } from '../services/notifications.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { BackendService } from '../services/backend.service';
import { BsModalRef } from 'ngx-bootstrap';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { UploadFile, UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';

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
   * Flag that holds it the file was correctly processed
   */
  readyToUpload: boolean;

  /**
   * File array that would contain the required file to register an application
   */
  public files: UploadFile[] = [];

  jsonFile: any;

  fileName: string;

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private http: HttpClient
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.registerAppMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.readyToUpload = false;
    this.fileName = 'loading...';
  }

  ngOnInit() {
  }

  /**
   * Register the app
   */
  registerApp() {
    this.backend.addAppDescriptor(this.organizationId, this.jsonFile)
      .subscribe(addDescriptorResponse => {
        this.notificationsService.add({
          message: 'Registered ' + this.jsonFile.name + 'app',
          timeout: 5000
        });
        this.bsModalRef.hide();
      }, error => {
        this.notificationsService.add({
          message: error.error.message,
          timeout: 5000
        });
        this.bsModalRef.hide();
      });
  }

  /**
   * Checks if the form has been modified before discarding changes
   */
  discardChanges() {
    if (this.readyToUpload) {
      const confirmResult = confirm('Discard changes?');
      if (confirmResult) {
        this.bsModalRef.hide();
      }
    } else {
        this.bsModalRef.hide();
    }
  }

  public onFileDrop(event: UploadEvent) {
    this.files = event.files;
    if (event.files.length > 1) {
      alert('Multiple files upload is unavailable');
    } else {
      for (const droppedFile of event.files) {
        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
              try {
                this.jsonFile = JSON.parse(fileReader.result as string);
                this.readyToUpload = true;
              } catch (e) {
                alert('JSON FILE ERROR: \r' + e + '.\rFile not valid for registering an app.');
              }
            };
            this.fileName = file.name;
            fileReader.readAsText(file);
          });
        } else {
          // Only files allowed
          alert('Folder upload is unavailable. Please upload a valid .json file');
        }
      }
    }
  }

  fileSelectorChange(e) {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        this.jsonFile = JSON.parse(fileReader.result as string);
        this.readyToUpload = true;
      } catch (event) {
        alert('JSON FILE ERROR: \r' + event + '.\rFile not valid for registering an app.');
        e.path[0].value = '';
      }
    };
    this.fileName = e.target.files[0].name;
    fileReader.readAsText(e.target.files[0]);
  }

}
