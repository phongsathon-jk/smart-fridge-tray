import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from 'ionic-native';
import { ViewAllItemsPage } from '../view-all-items/view-all-items';

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {
  storage : Storage;
  newItem : any;
  today : any;

  constructor(private navCtrl: NavController, storage: Storage, public alertCtrl: AlertController) {
    this.storage = storage;
    this.today = new Date().toISOString();
    this.newItem = {
      expiry_date: this.today
    };
  }

  ionViewWillEnter() {
    this.newItem = {
      expiry_date: this.today
    };
  }

  // local testing
  // scanBarcode() {
  //   BarcodeScanner.scan()
  //     .then((result) => {
  //       this.getProductByBarcode(result.text);
  //     })
  //     .catch((error) => {
  //       this.showAlert('Cannot Barcode', error);
  //     });
  // }

  getProductByBarcode(barcode) {
    this.storage.get('products').then((products) => {
      for (let i = 0; i < products.length; i++) {
        if (products[i].barcode === barcode) {
          this.newItem = {
            name: products[i].name,
            barcode: products[i].barcode,
            weight_gram: products[i].weight_gram,
            expiry_date: this.today
          };
        }
      }
    });
  }

  // device testing
  scanBarcode() {
    this.newItem = {
      name: 'Tomato Juice 1 Litre',
      barcode: '1234567890',
      weight_gram: 1000,
      expiry_date: this.today
    }
  }

  save() {
    let missingFields = this.validateNewItem(this.newItem);

    if(missingFields === '') this.searchProduct(this.newItem);
    else this.showAlert('Missing Details', missingFields);
  }

  validateNewItem(newItem) {
    let result = '';

    if (!newItem.name) result += 'Name, ';
    if (!newItem.barcode) result += 'Barcode, ';
    if ((!newItem.weight_gram) || (newItem.weight_gram <= 0)) result += 'Weight, ';
    if (!newItem.expiry_date) result += 'Expiry date, ';

    return result.substr(0, result.length - 2);
  }

  searchProduct(item) {
    let foundProduct;

    this.storage.get('products').then((products) => {
      for (let i = 0; i < products.length; i++) {
        if (products[i].barcode === item.barcode) foundProduct = products[i];
      }

      if (foundProduct) this.addNewItem(foundProduct);
      else this.addNewProduct(item);
    });
  }

  addNewItem(item) {
    console.log('add new item', item);

    this.storage.get('items').then((items) => {
      item = {
        name: item.name,
        barcode: item.barcode,
        weight_gram: item.weight_gram,
        original_weight: item.weight_gram,
        expiry_date: item.expiry_date
      };

      items.push(item);
      this.storage.set('items', items).then((result) => {
        this.navCtrl.push(ViewAllItemsPage);
      });
    });
  }

  addNewProduct(product) {
    let newProduct = {
      name: product.name,
      barcode: product.barcode,
      weight_gram: product.weight_gram
    };

    console.log('add new product', newProduct);

    this.storage.get('products').then((products) => {
      products.push(newProduct);
      this.storage.set('products', products).then((result) => {
        this.addNewItem(newProduct);
      });
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
