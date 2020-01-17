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
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'download-file-info',
  templateUrl: './download-file-info.component.html',
  styleUrls: ['./download-file-info.component.scss']
})
export class DownloadFileInfoComponent {
  /**
   * Loaded Data status
   */
  loadedData: boolean;
  /**
   *  Url is send only if the log is ready to be downloaded
   */
  url: string;
    /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }
}
