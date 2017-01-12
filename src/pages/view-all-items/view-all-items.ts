import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-view-all-items',
  templateUrl: 'view-all-items.html'
})
export class ViewAllItemsPage {

  constructor(public navCtrl: NavController, public storage: Storage) {
    // set a key/value
    storage.set('name', 'Max');

    storage.get('name').then(function (names) {
      // $scope.names = names;
    });
  }

}
