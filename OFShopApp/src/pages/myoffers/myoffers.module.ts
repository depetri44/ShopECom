import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyoffersPage } from './myoffers';

@NgModule({
  declarations: [
    MyoffersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyoffersPage),
  ],
})
export class MyoffersPageModule {}
