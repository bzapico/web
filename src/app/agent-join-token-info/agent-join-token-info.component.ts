import { Component, OnInit } from '@angular/core';
import { Backend } from '../definitions/interfaces/backend';
import { BsModalRef } from 'ngx-bootstrap';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { NotificationsService } from '../services/notifications.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';

@Component({
  selector: 'app-agent-join-token-info',
  templateUrl: './agent-join-token-info.component.html',
  styleUrls: ['./agent-join-token-info.component.scss']
})
export class AgentJoinTokenInfoComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Loaded Data status
   */
  loadedData: boolean;

  /**
   * Model that hold organization ID, Edge Controller ID and agent
   */
  organizationId: string;
  edgeControllerId: string;
  agent: any;

  /**
   * Models that removes the possibility for the user to close the modal by clicking outside the content card
   */
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  constructor(
    public bsModalRef: BsModalRef,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.agentJoinTokenInfoMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    this.agent = {};
  }

  ngOnInit() {
    this.getAgentToken(this.organizationId, this.edgeControllerId);
  }

  /**
   * Gets the new agent related operation to EIC
   * @param organizationId Organization identifier
   * @param edgeControllerId Edge controller id
   */
  getAgentToken(organizationId: string, edgeControllerId: string) {
    if (organizationId !== null && edgeControllerId !== null) {
      this.backend.createAgentJoinToken(this.organizationId,  this.edgeControllerId)
      .subscribe((agent: any[]) => {
        this.agent = agent || [];
      });
    }
  }

  /**
   * Create a new JavaScript Date object based on the timestamp
   * and multiplied by 1000 so that the argument is in milliseconds, not seconds.
   * @param timestamp is an integer that represents the number of seconds elapsed
   */
  parseTimestampToDate(timestamp: any) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const formatedDate = month + '/' + day + '/' + year;

    return formatedDate;
  }

  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }

}