import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../service/firebase_service';
import { WishList } from '../../model/wishlist';
import { AddproductPage } from '../addproduct/addproduct';
import { Constants } from '../../constatnt/constants';

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

  wishList = Array();
  userId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseservices: FirebaseService, public toastController: ToastController) {
      this.userId = window.localStorage.getItem("USERID");
    this.getAllWishList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
  }

  getAllWishList(){
    this.wishList = [];
    this.firebaseservices.getAllData(Constants.WishList).then(res=>{
      if(res){
        res.forEach((doc:any)=>{
          if(doc.data().userid == this.userId){
            let wishitems = {} as WishList; 
            wishitems.userid = doc.data().userid;
            wishitems.wishitemid = doc.data().wishitemid;
            wishitems.product_id = doc.data().product_id;
            wishitems.product_name = doc.data().product_name;
            wishitems.product_title = doc.data().product_title;
            wishitems.price = doc.data().price;
            wishitems.category = doc.data().category;
            wishitems.featured_img = doc.data().featured_img;

            console.log(wishitems.featured_img);
            
  
  
            this.wishList.push(wishitems);
          }
             
        })
      }
     
    });
  }


  addProductPage(){
    this.navCtrl.push(AddproductPage);
  }

  removeList(wishitem: WishList){
    this.firebaseservices.removeWishList(wishitem).then(res=>{
      this.getAllWishList();
    });
  }
 

}
