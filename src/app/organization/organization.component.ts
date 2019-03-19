import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserInfoComponent } from '../user-info/user-info.component';
import { Backend } from '../definitions/interfaces/backend';
import { BackendService } from '../services/backend.service';
import { MockupBackendService } from '../services/mockup-backend.service';
import { LocalStorageKeys } from '../definitions/const/local-storage-keys';
import { NotificationsService } from '../services/notifications.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UpdateEventsService } from '../services/update-events.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  /**
   * Backend reference
   */
  backend: Backend;

  /**
   * Models that hold organization id, name, subscription type and the users list
   */
  organizationId: string;
  organizationName: string;
  subscriptionType: string;
  users: any[];

  /**
   * Loaded Data status
   */
  loadedData: boolean;

  /**
   * Reference for the service that allows the user info component
   */
  modalRef: BsModalRef;
  modalRefOnHide: any;

  /**
   * Hold request error message or undefined
   */
  requestError: string;

  /**
   * Models that hold the sort info needed to sortBy pipe
   */
  sortedBy: string;
  reverse: boolean;

  /**
   * Model that hold the search term in search box
   */
  searchTerm: string;

  /**
   * Variable to store the value of the filter search text and sortBy pipe
   */
  filterField: boolean;

  constructor(
    private modalService: BsModalService,
    private backendService: BackendService,
    private mockupBackendService: MockupBackendService,
    private notificationsService: NotificationsService,
    private router: Router,
    private updateService: UpdateEventsService
  ) {
    const mock = localStorage.getItem(LocalStorageKeys.organizationMock) || null;
    // check which backend is required (fake or real)
    if (mock && mock === 'true') {
      this.backend = mockupBackendService;
    } else {
      this.backend = backendService;
    }
    // Default initialization
    this.loadedData = false;
    this.organizationName = 'Loading...';
    this.subscriptionType = 'Free subscription';
    this.users = [];
    this.requestError = '';

    // SortBy
    this.sortedBy = '';
    this.reverse = false;
    this.searchTerm = '';

    // Filter field
    this.filterField = false;
  }

  ngOnInit() {
    const jwtData = localStorage.getItem(LocalStorageKeys.jwtData) || null;
    if (jwtData !== null) {
      this.organizationId = JSON.parse(jwtData).organizationID;
      if (this.organizationId !== null) {
        this.backend.getOrganizationInfo(this.organizationId)
          .subscribe(response => {
              this.organizationName = response.name;
          });
          this.updateUserList();
      }
    }
    this.updateService.changesOnUserList.subscribe(
      result => {
      this.backend.getOrganizationUsers(this.organizationId)
        .subscribe(response => {
          this.users = response.users;
        });
      }
    );
  }

  /**
   * Opens the modal view that holds the user info component
   */
  openUserInfo(user) {
    const initialState = {
      organizationName: this.organizationName,
      organizationId: this.organizationId,
      userName: user.name,
      email: user.email,
      role: user.role_name,
    };

    this.modalRef = this.modalService.show(UserInfoComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRefOnHide = this.modalService.onHide.subscribe((reason: string) => {this.updateUserList(); });
  }

  /**
   * Opens the modal view that holds the user info and editable component
   */
  openEditUser(user) {
    const initialState = {
      organizationName: this.organizationName,
      organizationId: this.organizationId,
      userName: user.name,
      email: user.email,
      userRole: user.role_name,
      title: 'Edit user',
      selfEditProfile: false
    };

    this.modalRef = this.modalService.show(EditUserComponent, { initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => {
        if (this.router.url === '/organization') {
        this.updateUserList();
      }
    });
  }

  /**
   * Opens the modal view that holds add user component
   */
  addUser() {
    const initialState = {
      organizationId: this.organizationId,
    };

    this.modalRef = this.modalService.show(AddUserComponent, {initialState, backdrop: 'static', ignoreBackdropClick: false });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { this.updateUserList(); });
  }

  /**
   * Requests an updated list of available users to update the current one
   */
  updateUserList() {
    // Requests an updated users list
    this.backend.getOrganizationUsers(this.organizationId)
    .subscribe(response => {
        if (response.users.length) {
          this.users = response.users;
        } else {
          this.users = [];
        }
        if (!this.loadedData) {
          this.loadedData = true;
        }
    }, errorResponse => {
        this.loadedData = true;
        this.requestError = errorResponse.error.message;
      });
  }
  /**
   * Sortby pipe in the component
   */
  setOrder(categoryName: string) {
    if (this.sortedBy === categoryName) {
      this.reverse = !this.reverse;
      this.filterField = false;
    }
    this.sortedBy = categoryName;
    this.filterField = true;
  }

  /**
   * Reset all the filters fields
   */
  resetFilters() {
    this.filterField = false;
    this.searchTerm = '';
    this.sortedBy = '';
  }

  /**
   * Gets the category headers to add a class
   * @param categoryName class for the header category
   */
    getCategoryCSSClass(categoryName: string) {
      if (this.sortedBy === '') {
        return 'default';
      } else {
        if (this.sortedBy === categoryName) {
          return 'enabled';
        } else if (this.sortedBy !== categoryName) {
          return 'disabled';
        }
      }
    }
  }


