import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-view-all-items',
  templateUrl: 'view-all-items.html'
})
export class ViewAllItemsPage {
  storage: Storage;
  items: any;

  constructor(private navCtrl: NavController, storage: Storage, public http: Http, public alertCtrl: AlertController) {
    this.storage = storage;
    this.items = [];

    this.loadItems();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  loadItems() {
    this.storage.get('items').then((items) => {
      this.items = items;

      if (this.items.length > 0) this.updateItem();
    });
  }

  updateItem() {
    this.http.get('https://gist.githubusercontent.com/phongsathon-jk/8c4e3ce2e0a6deb86e9e117f4f6715e6/raw/5a47d138b4a8c8bbd6d9853f33cb8c147060d060/smart_fridge_tray_data.json')
      .map(res => res.json())
      .subscribe(data => {
        for (let i = 0; i < this.items.length; i++) {
          // update weight
          this.items[i].weight_gram = data;

          console.log('original weight', this.items[i].original_weight);
          console.log('new weight', this.items[i].weight_gram);

          // if weight is low, notify
          if (((this.items[i].original_weight - this.items[i].weight_gram) / this.items[i].original_weight) <= 0.1) this.showAlert('Running Out Of Stock', 'You have only ' + this.items[i].weight_gram + ' g of ' + this.items[i].name);

          console.log('expiry date', this.items[i].expiry_date);

          // if 1 day to expiry date
          // if ((new Date().toISOString() - this.items[i].expiry_date) <= 1)
        }
    });
  }

  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });

    alert.present();
  }
}
