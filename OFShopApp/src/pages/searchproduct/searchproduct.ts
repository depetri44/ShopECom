import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../service/firebase_service';
import { Product } from '../../model/products';
import { WishList } from '../../model/wishlist';
import { AddCart } from '../../model/cart';
import { Constants } from '../../constatnt/constants';

/**
 * Generated class for the SearchproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchproduct',
  templateUrl: 'searchproduct.html',
})
export class SearchproductPage {

  productList: any;
  cartList = Array();
  wishList = Array();
  itemAmount: any;
  catid: any;
  userId: string;
  cartamount: any;
  price : number;
  timeStamp: any;
  descending: boolean = false;
  order: number;

  cart:any; 
  wish:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseservices: FirebaseService, public toastController: ToastController) {
    this.catid = navParams.get('data');

    this.userId = window.localStorage.getItem("USERID");

    //this.callProductListApi();

    //this.getAllCarts();

   // this.getAllWishList();

  }

  
  getAllCarts(){

    this.firebaseservices.getAllData(Constants.CartList).then(res=>{
      this.cartList = [];
      if(res){
        res.forEach((doc:any)=>{
          if(doc.data().userid == this.userId){
            let cartitems = {} as AddCart; 
            cartitems.cartId = doc.data().cartId;
            cartitems.categoryid = doc.data().categoryid;
            cartitems.userid = doc.data().userid;
            cartitems.productid = doc.data().productid;
            cartitems.cartcount = doc.data().cartcount;
            cartitems.cart_amount = doc.data().cart_amount;
  
  
            this.cartList.push(cartitems);
            console.log("Carts: "+this.cartList);
          }
             
        })
      }
     
    });
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
            wishitems.product_title = doc.data().product_name;
            wishitems.price = doc.data().price;
            wishitems.category = doc.data().category;
            wishitems.featured_img = doc.data().featured_img;
  
  
            this.wishList.push(wishitems);
            console.log("WishList: "+this.cartList);
          }
             
        })
      }
     
    });
  }

  callProductListApi(){
    this.firebaseservices.getAllData(Constants.ProductList).then(res=>{
      res.forEach((doc:any)=>{
        //if(doc.data().category == this.catid){
            let products = {} as Product; 
            products.product_id = doc.data().product_id;
            products.product_name = doc.data().product_name;
            products.product_title = doc.data().product_title;
            products.price = doc.data().price;
            products.configuration = doc.data().configuration;
            products.body = doc.data().body;
            products.category = doc.data().category;
            products.featured_img = doc.data().featured_img;
            products.availability = doc.data().availability;
            products.product_owner = doc.data().product_owner;
            products.product_owner_contact_1 = doc.data().product_owner_contact_1;
            products.product_owner_contact_2 = doc.data().product_owner_contact_2;
            products.published_at = doc.data().published_at;
            products.created_at = doc.data().created_at;
            products.updataed_at = doc.data().updataed_at;  
            products.tags = doc.data().tags;

             //console.log(products);

             this.productList.push(products);
       // }
           
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
  }


  onItemClicked(itemid: string){
     console.log('ID ',itemid);
      
  }
  addToCartClicked(prdct: Product){
    //this.cart = null;
      if(this.cartList){
        this.cartList.forEach((crt: AddCart) => {
          if(prdct.product_id == crt.productid){
              this.cart = crt;
          }
        });
      }
    this.timeStamp = new Date().valueOf().toString();    
    let addCart:any = {};
    this.price = prdct.price;

    let itemCount: number;
    if(this.cart)
      itemCount = this.cart.cartcount;
     
    itemCount = this.cart?(itemCount+1):1;
    this.itemAmount = prdct.price;
    this.cartamount = itemCount * prdct.price;
    addCart.item_amount = this.itemAmount;
    addCart.cartId = this.cart?this.cart.cartId:this.timeStamp+"CART"+this.userId;
    addCart.userid = this.cart?this.cart.userid:this.userId;
    addCart.categoryid = this.cart?this.cart.categoryid :this.catid;
    addCart.productid = this.cart?this.cart.productid :prdct.product_id;
    addCart.cartcount = itemCount;
    addCart.cart_amount = this.cartamount;

    
    if(this.cart){
      this.firebaseservices.updateProductCart(addCart).then(res=>{
        this.showToast("Cart is Updated!");
      }, err=>{
        this.showToast("Cart is not Updated!");
      });
    }else{
      this.firebaseservices.addProductCart(addCart).then(res=>{
        this.showToast("Cart is Added!");
      }, err=>{
        this.showToast("Cart is not Added!");
      });
    }
    
    // this.firebaseservices.addProductCart(addCart).then(res=>{
    //   console.log("Value Updated");
    // }, err=>{
    //   console.log("Value Updation Error!");
    // });

    this.getAllCarts();
    
  } 

  addToWishListClicked(prdct: Product){
    this.wish = null;
    let addWishItem:any = {};
    this.timeStamp = new Date().valueOf().toString();  
    
    if(this.wishList){
      this.wishList.forEach((crt: WishList) => {
        console.log(prdct.product_id+"=="+crt.product_id);
        if(prdct.product_id == crt.product_id){
          console.log("Condition Satisfied!");
            this.wish = crt;
        }
      });
    }
    
    
    if(this.wish){
      this.firebaseservices.removeWishList(this.wish).then(res=>{
        this.showToast("Item is removed from wishList!");
      }, err=>{
        this.showToast("Item is not removed from wishList!");
      });
    }else{
      addWishItem.wishitemid = this.cart?this.cart.cartId:this.timeStamp+"WISH"+this.userId;
      addWishItem.userid = this.userId;
      addWishItem.product_id = prdct.product_id;
      addWishItem.product_name = prdct.product_name;
      addWishItem.product_title = prdct.product_title;
      addWishItem.price = prdct.price;
      addWishItem.category = prdct.category;
      addWishItem.featured_img = prdct.featured_img;

      this.firebaseservices.addProductWishList(addWishItem).then(res=>{
        this.showToast("Item is Added in wishList!");
      }, err=>{
        this.showToast("Item is not in wishList!!");
      });
    }
    this.getAllWishList();
    
  } 

  showToast(msg: string){
    let toast = this.toastController.create({
      message: ""+msg,
      duration: 5000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: "Close"
    });
    toast.present();
  }
  searchProducts(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

}
