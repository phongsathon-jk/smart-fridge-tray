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
          this.checkWeight(this.items[i], data);
          this.checkExpiryDate(this.items[i]);
        }
    });
  }

  checkWeight(item, newWeight) {
    // update weight
    item.weight_gram = newWeight;

    // if weight is low, notify
    if ((item.weight_gram / item.original_weight) <= 0.1) this.showAlert('Running Out Of Stock', 'You have only ' + item.weight_gram + ' g of ' + item.name);
  }

  checkExpiryDate(item) {
    let expiryDate = new Date(item.expiry_date);
    let today = new Date();
    let daysDifference = Math.abs((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDifference <= 1) this.showAlert('Expire Soon', item.name + ' will expire on ' + expiryDate.getDate() + '.' + (expiryDate.getMonth() + 1) + '.' + expiryDate.getFullYear());
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
