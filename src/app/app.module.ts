import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { ViewAllItemsPage } from '../pages/view-all-items/view-all-items';
import { AddItemPage } from '../pages/add-item/add-item';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ViewAllItemsPage,
    AddItemPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ViewAllItemsPage,
    AddItemPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
