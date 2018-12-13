import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutProductPage } from './checkout-product';

@NgModule({
  declarations: [
    CheckoutProductPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutProductPage),
  ],
})
export class CheckoutProductPageModule {}
