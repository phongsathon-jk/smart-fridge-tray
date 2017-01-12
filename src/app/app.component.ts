import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      /*
       * Initialize the products.
       * This is a database of all products those are recognised by the system.
       * Scan an item's barcode then compare against the following products to get its detail.
       */
      storage.set('products', [
        {
          name: 'Tomato Juice 1 Litre',
          barcode: '1234567890',
          weight_gram: 100,
        }, {
          name: 'Apple',
          barcode: null,
          weight_gram: 1000,
          expiry_date: null,
          life_span_day: 20
        }
      ]);
    });
  }
}
