import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the MyoffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myoffers',
  templateUrl: 'myoffers.html',
})
export class MyoffersPage {

  offer: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastController: ToastController) {
      
  }

  ionViewDidLoad() {
    this.offer = 0;
  }
  fabOffersClicked(){
    if(this.offer == 0)
      this.showToast("Please Select Any Offer!");
    else
      this.showToast("You Offer will be Adding in the Next Purchase");
  }
  offer1Clicked(){
    this.showToast("Offer Flat50 is Selected!");
    this.offer = 1;
  }
  offer2Clicked(){
    this.showToast("Offer Flat10 is Selected!");
    this.offer = 2;
  }
  showToast(msg: string){
    let toast = this.toastController.create({
      message: ""+msg,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: "Close"
    });
    toast.present();
  }


}
