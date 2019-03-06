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
   *  Reference to the drop area so we can attach some events to it
   * */
  dropArea: any;
  uploaded: boolean;
  public files: UploadFile[] = [];

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
    this.uploaded = false;
    this.dropArea = document.getElementById('drop-area');
  }

  ngOnInit() {
    console.log(this.dropArea);
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



  public dropped(event: UploadEvent) {
    this.files = event.files;
    let jsonFile: object;
    /*
      Control de casos:
        1 - si se arrastra más de un fichero... pa tu culo un puchero
        2 - si el fichero no es un json. pa tu culo mi p***on
        3 - si la lectura es correcta, pasamos de fase
    */
    for (const droppedFile of event.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const fileReader = new FileReader();
          fileReader.onload = (e) => {
            try {
              jsonFile = JSON.parse(fileReader.result as string);
            } catch (e) {
              alert('JSON FILE ERROR: \r' + e + '.\rFile not valid for registering an app.');
            }
          };
          fileReader.readAsText(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  fileChanged(e) {
    console.log(e);
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }


}
