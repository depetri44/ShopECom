import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../service/firebase_service';
import { CartDetails } from '../../constatnt/cartDetails';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AddCart } from '../../model/cart';
import { WishList } from '../../model/wishlist';
import { Product } from '../../model/products';
import { Constants } from '../../constatnt/constants';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  productId: any;
  userId: any;
  timeStamp: any;
  
  cart:any; 
  wish:any;
  url_img: any;
  catid: any;
  isWish: boolean;
  
  productList = Array();
  productcartList= Array();
  wishList = Array();
  productcart = {} as CartDetails;
  
  nproducts = {} as Product;;
  //cartProductDetails = Array();


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fireservices: FirebaseService, private  toastController: ToastController,
    private alertCtrl: AlertController) {
    this.productId = navParams.get('data');
    this.userId = window.localStorage.getItem("USERID");
    //this.catid = navParams.get("catid");
    this.isWish = false;
    console.log("PID: "+this.productId);
    console.log("UID: "+this.userId);

    
   

  }

  ionViewDidLoad(){
    this.loadProductDetails();
  }
  loadProductDetails(){
    this.fireservices.getDataById(Constants.ProductList, this.productId).then(res=>{
      if(res){
          //console.log("Product Data:"+JSON.stringify(res.data()));

          //console.log(res.data().product_id);
          this.productcart.categoryid = res.data().category;
          this.productcart.productid = res.data().product_id;
          this.productcart.item_amount = res.data().price;
          this.productcart.price = res.data().price;
                
          this.productcart.featured_img = res.data().featured_img;
          this.productcart.configuration = res.data().configuration;
          this.productcart.product_title = res.data().product_title;
          this.productcart.product_name = res.data().product_name;
          this.productcart.isWishList = false;
          this.url_img = res.data().featured_img
          this.catid = res.data().category;
          //console.log("CID: "+this.catid);

          
          this.productcart.cartcount = 0;
          this.productcart.cart_amount = 0;
    
          this.callProductListApi(res.data().category);
          
          this.fireservices.getAllData(Constants.CartList).then(res1=>{
            if(res1){
              res1.forEach((doc:any)=>{
                               
                if(doc.data().productid == this.productId && doc.data().userid == this.userId){
                  this.productcart.cartId = doc.data().cartId;
                  this.productcart.cartcount = doc.data().cartcount;
                  this.productcart.cart_amount = doc.data().cart_amount;
                  
                }
              })
            }
          }, error=>{
            console.log("Error: "+error);
            this.productcart.cartcount = 0;
            this.productcart.cart_amount = 0;
            
          })

          this.fireservices.getAllData(Constants.WishList).then(res2=>{
            if(res2){
              res2.forEach((doc:any)=>{
                if(doc.data().product_id == this.productId && doc.data().userid == this.userId){
                    this.isWish = true;
                    this.productcart.isWishList = true;
                    this.productcart.wishItemId = doc.data().wishitemid;
                }
              })
            }
          }, error=>{
            this.productcart.isWishList = false;
            console.log("Error: "+error);
          })
          //this.productcartList.push(this.productcart);
          console.log("Data: "+JSON.stringify(this.productcart));
          console.log(this.url_img);
          
        
      }
    })
  }

  callProductListApi(catid: any){
    console.log("PDFKSDFSDLFLSDFLS: calling");
    this.fireservices.getAllData(Constants.ProductList).then(res=>{
      res.forEach((doc:any)=>{
        if(doc.data().category == catid){
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

            this.nproducts = products;
             console.log(products);

             this.productList.push(products);
        }
           
          console.log("LKJHG: "+JSON.stringify(this.productList));
      }, error=>{
        console.log("PDFKSDFSDLFLSDFLS: "+ error);
      })
    })
  }


  addToCart(cartitem: CartDetails){

    if(cartitem.cartId){
      this.cart = cartitem;
      // this.cartList.forEach((crt: AddCart) => {
      //   if(prdct.product_id == crt.productid){
            
      //   }
      // });
    }
    this.timeStamp = new Date().valueOf().toString();    
    let addCart:any = {};
    let itemAmount: any;
    let cartamount: any;
    let price: any;
    price = cartitem.item_amount;

    let itemCount: number;
    if(this.cart)
      itemCount = this.cart.cartcount;
    
    itemCount = this.cart?(itemCount+1):1;
    itemAmount = cartitem.price;
    cartamount = itemCount * cartitem.price;
    addCart.item_amount = cartitem.price;
    addCart.cartId = this.cart?this.cart.cartId:this.timeStamp+"CART"+this.userId;
    addCart.userid = this.userId;
    addCart.categoryid = cartitem.categoryid;
    addCart.productid = cartitem.productid;
    addCart.cartcount = itemCount;
    addCart.cart_amount = cartamount;

    
    if(this.cart){
      this.fireservices.updateProductCart(addCart).then(res=>{
        this.showToast("Cart is Updated!");
        cartitem.cartcount++;
      }, err=>{
        this.showToast("Cart is not Updated!");
      });
    }else{
      this.fireservices.addProductCart(addCart).then(res=>{
        this.showToast("Cart is Added!");
      }, err=>{
        this.showToast("Cart is not Added!");
      });
    }


    // this.timeStamp = new Date().valueOf().toString();    
    // let addCart = {} as AddCart;
    // addCart.item_amount = cartitem.item_amount;
    // addCart.cartId = this.timeStamp+"CART"+this.userId;
    // addCart.userid = this.userId;
    // addCart.categoryid = cartitem.categoryid;
    // addCart.productid = cartitem.productid;
    // cartitem.cartcount++;
    // addCart.cartcount = cartitem.cartcount;
    // addCart.cart_amount = cartitem.item_amount * cartitem.cartcount;

    // console.log(JSON.stringify(addCart));
    

    // this.fireservices.updateProductCart(addCart).then(res=>{
    //   //this.getAllCartList();
    //   this.showToast("Cart is Updated!");
    // }, err=>{
    //   console.log("Error: "+err);
      
    //   this.showToast("Cart is not Updated!");
    // });
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

  removeCart(cartitem: CartDetails){
    if( cartitem.cartcount != 0){
      if( cartitem.cartcount == 1){
        this.alertConfirm(cartitem);
        // this.fireservices.removeProductCart(cartitem.cartId).then(res=>{
        //   //this.getAllCartList();
        //   this.showToast("Cart is Removed!");
        // }, err=>{
        //   console.log("Error: "+err);
          
        //   this.showToast("Cart is not Removed!");
        // });
      }else{
        let addCart:any = {};
        addCart.item_amount = cartitem.item_amount;
        addCart.cartId = cartitem.cartId;
        addCart.userid = this.userId;
        addCart.categoryid = cartitem.categoryid;
        addCart.productid = cartitem.productid;
        addCart.cartcount = cartitem.cartcount;
        addCart.cart_amount = cartitem.item_amount * cartitem.cartcount;

        

        this.fireservices.updateProductCart(addCart).then(res=>{
          //this.getAllCartList();
        cartitem.cartcount--;
          this.showToast("Cart is Updated!");
        }, err=>{
          console.log("Error: "+err);
          
          this.showToast("Cart is not Updated!");
        });
      }
    }else{
      this.showToast("Please Add a Cart!");
    }
  }

  alertConfirm(cartitem: CartDetails) {
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
            this.fireservices.removeProductCart(cartitem.cartId).then(res=>{
              //this.getAllCartList();
              cartitem.cartcount--;
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

  wishListAction(prdct: CartDetails){

    console.log(prdct.isWishList);
    
    
    this.wish = prdct.wishItemId;
    let addWishItem:any = {};
    this.timeStamp = new Date().valueOf().toString();  
    let wishlist = {} as WishList;
    
    if(prdct.isWishList){
      console.log("Remove Wish: "+prdct.wishItemId);
      wishlist.wishitemid = prdct.wishItemId;
      this.fireservices.removeWishList(wishlist).then(res=>{
        this.isWish = false;
        this.productcart.isWishList = false;
        this.showToast("Item is removed from wishList!");
      }, err=>{
        console.log("Error: "+err);
        
        this.showToast("Item is not removed from wishList!");
      });
    }else{
      addWishItem.wishitemid = this.cart?this.cart.cartId:this.timeStamp+"WISH"+this.userId;
      addWishItem.userid = this.userId;
      addWishItem.product_id = prdct.productid;
      addWishItem.product_name = prdct.product_name;
      addWishItem.product_title = prdct.product_title;
      addWishItem.price = prdct.price;
      addWishItem.category = prdct.categoryid;
      addWishItem.featured_img = prdct.featured_img;

      this.fireservices.addProductWishList(addWishItem).then(res=>{
        this.isWish = true;
        this.productcart.isWishList = true;
        this.showToast("Item is Added in wishList!");
      }, err=>{
        this.showToast("Item is not in wishList!!");
      });
    }
    
    this.productcart.isWishList = this.isWish;
  } 

  onItemClicked(prd: Product){
    this.navCtrl.push(ProductDetailsPage, {
      data: prd.product_id
    });
  }


}
