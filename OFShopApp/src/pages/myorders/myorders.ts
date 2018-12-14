import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../service/firebase_service';
import { ToastController } from 'ionic-angular';
import { Constants } from '../../constatnt/constants';
import { CheckoutOrder } from '../../model/checkoutList';
import { CartDetails } from '../../constatnt/cartDetails';
import { OrderList } from '../../model/orderList';

/**
 * Generated class for the MyordersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myorders',
  templateUrl: 'myorders.html',
})
export class MyordersPage {

  ordersList = Array();
  userId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseservices: FirebaseService, public toastController: ToastController) {
      this.userId = window.localStorage.getItem("USERID");
      this.getAllOrders()
  }
  getAllOrders(){
    this.firebaseservices.getAllData(Constants.OrderList).then(res=>{
      this.ordersList = [];
        if(res){
          res.forEach((doc: any) => {

              doc.data().orderLists.forEach((orderdoc: any)=>{
                  
                  let orders = {} as OrderList;
                  
                  orders.orderStatus = doc.data().orderStatus
                  orders.orderdatetime = doc.data().orderdatetime
                  orders.orderId = doc.data().orderId
                  orders.orderLatitude = doc.data().latitude
                  orders.orderLatitude = doc.data().latitude
                  orders.offercode = doc.data().offercode

                  orders.categoryid = orderdoc.categoryid;
                  orders.productid = orderdoc.productid;
                  orders.cartcount = orderdoc.cartcount;
                  orders.item_amount = orderdoc.item_amount;
                  orders.cart_amount = orderdoc.cart_amount;
                  orders.product_name = orderdoc.product_name;
                  orders.product_title = orderdoc.product_title;
                  orders.configuration = orderdoc.configuration;
                  orders.price = orderdoc.price;
                  orders.featured_img = orderdoc.featured_img;  
                  
                  console.log(JSON.stringify(orders));

                  this.ordersList.push(orders);         

              });      
              
              console.log("Next: "+ JSON.stringify(this.ordersList));  
            // this.ordersList.push(orders);
             
             
          });
        }
    }, error=>{
        console.log("Error: "+error);
        
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyordersPage');
  }

}
