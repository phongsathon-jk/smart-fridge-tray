import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-view-all-items',
  templateUrl: 'view-all-items.html'
})
export class ViewAllItemsPage {
  storage: Storage;
  items: any;

  constructor(private navCtrl: NavController, storage: Storage) {
    this.storage = storage;
    this.items = [];

    // Get products from DB
    this.storage.get('items').then((items) => {
      this.items = items;
    });
  }
}
