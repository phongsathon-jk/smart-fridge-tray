import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-view-all-items',
  templateUrl: 'view-all-items.html'
})
export class ViewAllItemsPage {

  public items: any;

  constructor(navCtrl: NavController, storage: Storage) {
    this.items = [];

    // Get products from DB
    storage.get('items').then((items) => {
      this.items = items;
    });
  }
}
