import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-view-all-items',
  templateUrl: 'view-all-items.html'
})
export class ViewAllItemsPage {

  products: any;

  constructor(navCtrl: NavController, storage: Storage) {
    this.products = [];

    // Get products from DB
    storage.get('products').then((products) => {
      this.products = products;
    });
  }
}
