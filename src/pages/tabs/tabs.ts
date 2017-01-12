import { Component } from '@angular/core';

import { ViewAllItemsPage } from '../view-all-items/view-all-items';
import { AddItemPage } from '../add-item/add-item';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ViewAllItemsPage;
  tab2Root: any = AddItemPage;

  constructor() {

  }
}
