import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseService } from '../../service/firebase_service';
import { ToastController } from 'ionic-angular';
import { CartDetails } from '../../constatnt/cartDetails';
import { Platform } from 'ionic-angular';
import { Constants } from '../../constatnt/constants';
import { CheckoutOrder } from '../../model/checkoutList';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { OrdersuccessPage } from '../ordersuccess/ordersuccess';

/**
 * Generated class for the CheckoutProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout-product',
  templateUrl: 'checkout-product.html',
})
export class CheckoutProductPage {

  cartList = Array();
  userId: string;
  catid: any;
  totalAmount: number;
  orderid: any;
  timeStamp: any;
  irderid: any;
  address: string;
  
  location: {
    latitude: number,
    longitude: number
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseservices: FirebaseService, public toastController: ToastController,
    private alertCtrl: AlertController, private platform:Platform, 
    public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
      
      this.timeStamp = new Date().valueOf().toString();  
      this.userId = window.localStorage.getItem("USERID");
      this.address   = "No Address Defined";
      this.totalAmount = 0;
      this.getAllCartList();
  }

  ionViewDidLoad() {
    this.address   = "No Address Defined";
    console.log('ionViewDidLoad CheckoutProductPage');
  }
  getLocation(){

  
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };


    this.geolocation.getCurrentPosition(options).then((position) => {

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude        
      };

      this.address   = "Your Current Address Defined";
      console.log("Lat: "+position.coords.latitude);
      console.log("Lng: "+position.coords.longitude);
      this.reverseGeocoding(this.location.latitude, this.location.longitude);

     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }
  reverseGeocoding(lat: any,lng: any){
    let options: NativeGeocoderOptions = {
      useLocale: false,
      maxResults: 2
    };

    this.nativeGeocoder.reverseGeocode(lat, lng, options).then((res)=>{
        console.log("Geo Coder: "+res);
        
    }, error=>{
        console.log("Geo Error: "+error);
        
    })

    new Promise((resolve, reject)=>{
        this.nativeGeocoder.reverseGeocode(lat, lng).then((result) => {
          console.log("Result: "+result);
        }).catch((error)=>{
          console.log("Error: "+error);
        })
    })

    // this.nativeGeocoder.reverseGeocode(lat,lng,options)
    // .then((result: NativeGeocoderReverseResult) =>{
    // this.data.addrss= result[1].subLocality +","+ result[1].locality +","+
    // result[1].subAdministrativeArea +","+ result[1].administrativeArea +"-"+
    // result[1].postalCode +","+result[1].countryName;
    // console.log(this.data.addrss);
    // alert(JSON.stringify(this.data.addrss));
    // }).catch((error: any) => console.log(error));
  }

  checkoutOrder(){

    if(this.location != null){
      this.timeStamp = new Date().valueOf().toString(); 
      let checktOrder= {} as CheckoutOrder;
      //addCart.cartId = this.cart?this.cart.cartId:this.timeStamp+"CART"+this.userId;

      checktOrder.orderLatitude =  this.location.latitude;
      checktOrder.orderLongitude =  this.location.latitude;
      checktOrder.orderId = this.orderid;
      checktOrder.orderStatus = "Order Dispatched!";
      checktOrder.orderdatetime = new Date().toDateString();
      checktOrder.offercode = "FLAT10";
      checktOrder.orderLists = this.cartList;//JSON.stringify(this.cartList);

        this.firebaseservices.checkoutOrders(this.userId,checktOrder).then(res=>{
          let length: any;
          let i: any;
          length = this.cartList.length;
          i=0;
          
          
          this.cartList.forEach(CartDetails => {
                this.firebaseservices.removeProductCart(CartDetails.cartId).then(res=>{
                    console.log(res);
                    i++;          
                    console.log("Length: "+length);
                    console.log("i: "+i);
                    if(i==length){
                      this.navCtrl.push(OrdersuccessPage);
                    }
                }, error=>{
                  console.log(error);
                  
                });
            });
            // /this.navCtrl.push()
        }, error=>{

        });
    }else
      this.showToast("Please select your current location!");
  }

  

  getAllCartList(){
    this.totalAmount = 0;
    this.firebaseservices.getAllData(Constants.CartList).then(res=>{
      this.cartList = [];
      if(res){
        res.forEach((doc:any)=>{
          if(doc.data().userid == this.userId){
            let cartitems = {} as CartDetails; 
            cartitems.cartId = doc.data().cartId;
            cartitems.categoryid = doc.data().categoryid;
            cartitems.userid = doc.data().userid;
            cartitems.productid = doc.data().productid;
            cartitems.cartcount = doc.data().cartcount;
            cartitems.cart_amount = doc.data().cart_amount;

            this.firebaseservices.getDataById(Constants.ProductList ,cartitems.productid).then(res1 => {
              if(res1){
                
                cartitems.product_name = res1.data().product_name;
                cartitems.product_title = res1.data().product_title;
                cartitems.price = res1.data().price;
                cartitems.featured_img = res1.data().featured_img;

                this.totalAmount = this.totalAmount + doc.data().cartcount * res1.data().price;
                console.log("cartitems.cart_amount: "+this.totalAmount);
                // console.log("cartitems.product_name: "+cartitems.product_name);
                // console.log("cartitems.product_title: "+cartitems.product_title);
                // console.log("cartitems.price: "+cartitems.price);
                // console.log("cartitems.featured_img: "+cartitems.featured_img);

                      
                // console.log("ValueN:::::::", snapshots.data().product_name)
                // console.log("ValueT:::::::", snapshots.data().product_title)
                // console.log("ValueP:::::::", snapshots.data().price)
                // console.log("ValueF:::::::", snapshots.data().featured_img)

                // res1.forEach((docm:any)=>{
                //   cartitems.product_name = docm.data().product_name;
                //   cartitems.product_title = docm.data().product_title;
                //   cartitems.price = docm.data().price;
                //   cartitems.featured_img = docm.data().featured_img;

                //   console.log("cartitems.product_name: "+cartitems.product_name);
                //   console.log("cartitems.product_title: "+cartitems.product_title);
                //   console.log("cartitems.price: "+cartitems.price);
                //   console.log("cartitems.featured_img: "+cartitems.featured_img);
                // });
                
                console.log(JSON.stringify(cartitems));
                
                
              }
            })

            // this.firebaseservices.getWishListById(cartitems.productid).then(res2 =>{
            //  // console.log("Result: "+res2.data().price);
              
            //   // if(res2){
            //   //   if(res2.data().productid == cartitems.productid)
            //   //       cartitems.isWishList = true;
            //   //   else
            //   //     cartitems.isWishList = false;
            //   // }
            // }, err=>{
            //   cartitems.isWishList = false;
            // });
  
  
            this.cartList.push(cartitems);
          }
             
        })
      }else
      console.log("Error getting");
     
    });
    
    this.orderid = "ORDER"+this.timeStamp; 
  }

  addCart(cartitem: CartDetails){
    let addCart:any = {};
    addCart.item_amount = cartitem.price;
    addCart.cartId = cartitem.cartId;
    addCart.userid = cartitem.userid;
    addCart.categoryid = cartitem.categoryid;
    addCart.productid = cartitem.productid;
    cartitem.cartcount++;
    addCart.cartcount = cartitem.cartcount;
    addCart.cart_amount = cartitem.price * cartitem.cartcount;

    

    this.firebaseservices.updateProductCart(addCart).then(res=>{
      this.getAllCartList();
      this.showToast("Cart is Updated!");
    }, err=>{
      console.log("Error: "+err);
      
      this.showToast("Cart is not Updated!");
    });
  }
  showToast(msg: string){
    let toast = this.toastController.create({
      message: ""+msg,
      duration: 5000,
      position: 'top'
    });
    toast.present();
  }
  alertConfirm(cartId: string) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Remove Cart',
      message: 'Do you want to remove from the Cart?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.firebaseservices.removeProductCart(cartId).then(res=>{
              //this.getAllCartList();
              this.showToast("Cart is Removed!");
            }, err=>{
              console.log("Error: "+err);
              
              this.showToast("Cart is not Removed!");
            });
          }
        }
      ]
    });
    alert.present();
  }

  removeCart(cartitem: CartDetails){
    if( cartitem.cartcount == 1){
      this.alertConfirm(cartitem.cartId);
      // this.firebaseservices.removeProductCart(cartitem.cartId).then(res=>{
      //   this.getAllCartList();
      //   this.showToast("Cart is Removed!");
      // }, err=>{
      //   console.log("Error: "+err);
        
      //   this.showToast("Cart is not Removed!");
      // });
    }else{
      let addCart:any = {};
      addCart.item_amount = cartitem.price;
      addCart.cartId = cartitem.cartId;
      addCart.userid = cartitem.userid;
      addCart.categoryid = cartitem.categoryid;
      addCart.productid = cartitem.productid;
      cartitem.cartcount--;
      addCart.cartcount = cartitem.cartcount;
      addCart.cart_amount = cartitem.price * cartitem.cartcount;

      

      this.firebaseservices.updateProductCart(addCart).then(res=>{
        this.getAllCartList();
        this.showToast("Cart is Updated!");
      }, err=>{
        console.log("Error: "+err);
        
        this.showToast("Cart is not Updated!");
      });
    }
  }

}
