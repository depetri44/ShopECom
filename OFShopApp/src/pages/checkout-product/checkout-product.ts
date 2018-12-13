import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseService } from '../../service/firebase_service';
import { ToastController } from 'ionic-angular';
import { CartDetails } from '../../constatnt/cartDetails';
import { Platform } from 'ionic-angular';
import { Constants } from '../../constatnt/constants';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseservices: FirebaseService, public toastController: ToastController,
    private alertCtrl: AlertController, public geolocation: Geolocation,
    private platform:Platform) {
      this.userId = window.localStorage.getItem("USERID");
      this.totalAmount = 0;
      this.getAllCartList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutProductPage');
  }
  getLocation(){


    //window.navigator.geolocation.getCurrentPosition();


    // this.platform.ready().then(() => {
    //   alert('start geolocation');
    //   let options = {
    //     timeout: 20000,
    //     enableHighAccuracy:true
    //   };

    //   this.geolocation.getCurrentPosition(options).then(resp => {
    //     alert('done');
    //     console.log(resp.coords.latitude);
    //     console.log(resp.coords.longitude);
    //   }).catch((error) => {
    //     alert('error geoloc');
    //   });

    // });

    // this.geolocation.getCurrentPosition().then((res) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //   //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
    //   let location='lat '+res.coords.latitude+' lang '+res.coords.longitude;
    //   let toast = this.toastController.create({
    //     message: location,
    //     duration: 3000
    //   });
    //   toast.present();

    // }).catch((error) => {
    // console.log('Error getting location', error);
    // });
    // this.geolocation.getCurrentPosition().filter((p)=>{

    // })
    
    // .then(position => {
    //   let locationObj = {
    //          lat: position.coords.latitude,
    //          lon: position.coords.longitude,
    //          timestamp: position.timestamp,
    //          accuracy: position.coords.accuracy
    //   };
    //   resolve(locationObj);
    // })
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
  
  
            this.cartList.push( cartitems);
          }
             
        })
      }else
      console.log("Error getting");
     
    });
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
