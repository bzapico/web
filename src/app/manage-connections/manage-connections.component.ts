import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'manage-connections',
  templateUrl: './manage-connections.component.html',
  styleUrls: ['./manage-connections.component.scss']
})
export class ManageConnectionsComponent implements OnInit {

  /**
   * Models that hold the title
   */
  title: string;

  /**
   * Models that holds forms info
   */
  manageConnectionsFilterForm: FormGroup;
  submitted = false;
  loading: boolean;

  /**
   * Model that hold Edge Controller ID and its info
   */
  organizationId: string;
  manageConnections: FormControl;
  filter: FormControl;

  /**
   * Model that hold the search term in search box
   */
  searchTerm: string;

  /**
   * NGX-select-dropdown
   */
  tab = 1;
  options = [];
  selectConfig = {};

  manageConnectionsOptions: any[];
  manageConnectionsSelectConfig = {};

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    ) {
    this.title = 'MANAGE CONNECTIONS';
    this.searchTerm = '';

    //  Manage connections dropdown
    this.manageConnections = null;
    this.manageConnectionsSelectConfig = {
      displayKey: 'name',
      search: false,
      height: 'auto',
      placeholder: 'No filter',
      limitTo: 4,
      moreText: 'more',
      noResultsFound: 'No results found!'
    };
    this.manageConnectionsOptions = [{
      name: 'WordPress',
      code: 0
    }, {
      name: 'MySQL',
      code: 1
    }, {
      name: 'MySQL2',
      code: 2
    }, {
      name: 'WordPress2',
      code: 3
    }];
  }

  ngOnInit() {
    this.manageConnectionsFilterForm = this.formBuilder.group({
      filter: [null],
    });
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.manageConnectionsFilterForm.controls; }

  /**
   * Opens the modal view that holds the add new connections component
   */
  addNewConnection() {
    console.log('add connection');
  }

  /**
   * Disconnects app instance
   */
  disconnectInstance(app) {
    console.log('disconnect');
  }

  /**
   * Close the modal window
   */
  closeModal() {
    this.bsModalRef.hide();
  }

  /**
   * Requests to add manage connections filter
   * @param f Form with the filter input data
   */
  addManageConnectionsFilter(f) {
    this.submitted = true;
    this.loading = true;
    this.bsModalRef.hide();
  }
}
