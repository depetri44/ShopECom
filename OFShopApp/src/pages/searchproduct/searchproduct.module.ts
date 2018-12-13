import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchproductPage } from './searchproduct';

@NgModule({
  declarations: [
    SearchproductPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchproductPage),
  ],
})
export class SearchproductPageModule {}
