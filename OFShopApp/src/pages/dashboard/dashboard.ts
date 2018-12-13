import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { ApphomePage } from '../apphome/apphome';
import { UserprofilePage } from '../userprofile/userprofile';
import { LoginPage } from '../login/login';
import { WishlistPage } from '../wishlist/wishlist';
import { CartlistPage } from '../cartlist/cartlist';
import { Constants } from '../../constatnt/constants';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  @ViewChild(Nav) nav: Nav;
  pages = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('DashboardPage: UID: ', window.localStorage.getItem(Constants.USERID).toString());
  }
  ionViewWillEnter() {
    this.pages = [
      { title: 'Home', page: ApphomePage, icon: 'ios-home-outline' },
      { title: 'MyCart', page: CartlistPage, icon: 'ios-cart-outline' },
      { title: 'MyOrders', page: ApphomePage, icon: 'ios-list-outline' },
      { title: 'MyWishList', page: WishlistPage, icon: 'ios-heart-outline' },
      { title: 'Notification', page: ApphomePage, icon: 'ios-notifications-outline' },
      { title: 'Profile', page: UserprofilePage, icon: 'ios-contact-outline' },
      { title: 'Settings', page: ApphomePage, icon: 'ios-settings-outline' }
    ];
    this.openPage(ApphomePage);
  }
  openPage(page) {
    this.nav.setRoot(page);
  }
  logout() {
    window.localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
    //this.authProvider.logout();
    //this.appCtrl.getRootNav().setRoot('LoginPage');
  }
  ionViewCanEnter() {
    //return this.authProvider.isLoggedIn();
  }
  slideMenuAction(){
    
  }
}
