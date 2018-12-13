import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartlistPage } from './cartlist';

@NgModule({
  declarations: [
    CartlistPage,
  ],
  imports: [
    IonicPageModule.forChild(CartlistPage),
  ],
})
export class CartlistPageModule {}
