import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { User } from "../model/user";
import { Product } from "../model/products";
import { AddCart } from "../model/cart";
import { WishList } from "../model/wishlist";
import { Constants } from "../constatnt/constants";
import { CheckoutOrder } from "../model/checkoutList";

@Injectable()
export class FirebaseService {
 
  private snapshotChangesSubscription: any;
  constructor(public afs: AngularFirestore){}


// creat orperations here
  createAccount(value: User){
    return new Promise<any>((resolve, reject) => {
     // let currentUser = firebase.auth().currentUser;
      this.afs.collection(Constants.UserList).doc(value.userid)
      .set({
        FirstName: value.firstname,
        LastName: value.lastname,
        email: value.email,
        MobileNumber: value.mobile,
        UserID: value.userid
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  addFireCategories(id, title, subtitle, imgUrl){
    return new Promise<any>((resolve, reject) => {
       this.afs.collection(Constants.ProductCategoryList).doc(id)
       .set({
         product_category_id: id,
         product_category_title: title,
         product_category_subtitle: subtitle,
         product_category_imgUrl: imgUrl
       })
       .then(
         res => resolve(res),
         err => reject(err)
       )
     })
  }
  
  addNewProduct(value: Product){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(Constants.ProductList).doc(value.product_id)
      .set({
        product_id: value.product_id,
        product_name: value.product_name,
        product_title: value.product_title,
        price: value.price,
        configuration: value.configuration,
        body: value.body,
        category: value.category,
        featured_img: value.featured_img,
        availability: value.availability,
        product_owner: value.product_owner,
        product_owner_contact_1: value.product_owner_contact_1,
        product_owner_contact_2: value.product_owner_contact_2,
        published_at: value.published_at,
        created_at: value.created_at,
        updataed_at: value.updataed_at,
        tags: value.tags
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  
  addProductCart(value: AddCart){
        
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(Constants.CartList).doc(value.cartId)
      .set({
        cartId: value.cartId,
        userid: value.userid,
        categoryid: value.categoryid,
        productid: value.productid,
        cartcount: value.cartcount,
        cart_amount: value.cart_amount
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  addProductWishList(prdct: WishList){
        
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(Constants.WishList).doc(prdct.wishitemid)
      .set({
            userid: prdct.userid,
            wishitemid: prdct.wishitemid,
            product_id: prdct.product_id,
            product_name: prdct.product_name,
            product_title: prdct.product_title,
            price: prdct.price,
            category: prdct.category,
            featured_img: prdct.featured_img
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  checkoutOrders(userId: any, checkoutOrder: CheckoutOrder){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(Constants.OrderList).doc(checkoutOrder.orderId)
      .set({
        orderId: checkoutOrder.orderId,
        orderStatus: checkoutOrder.orderStatus,
        orderdatetime: checkoutOrder.orderdatetime,
        offercode: checkoutOrder.offercode,
        orderLists: checkoutOrder.orderLists,
        latitude: checkoutOrder.orderLatitude,
        longitude: checkoutOrder.orderLongitude
    
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })

  }


  //Create Process

  getAllData(key: string){
        return new Promise<any>((resolve, reject) => {
        //   let currentitem = this.afs.collection('UserList');
          
        //   let currentUser = firebase.auth().currentUser;
          this.snapshotChangesSubscription = this.afs.collection(key)
          .get().subscribe(snapshots => {
            resolve(snapshots);
            snapshots.forEach((doc: any)=>{
             
            });
          })
    
        });
  }

  getDataById(key: string, id: string){
    return  new Promise<any>((resolve, reject)=>{
      //let currentUser = firebase.auth().currentUser;
      this.snapshotChangesSubscription = this.afs.collection(key).doc(id)
      .get()
      .subscribe((snapshots) => {
        resolve(snapshots)
       
      }, error =>{
         reject(error)
      })
    });
  }

  //Update Process here

  updateTask(taskKey, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection(Constants.FireStoreDB).doc(currentUser.uid).collection(Constants.UserList).doc(taskKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  
  updateProductCart(value: AddCart){
    console.log(value);
    
   // console.log(JSON.stringify(value));
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection(Constants.CartList).doc(value.cartId).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  
  removeWishList(prdct: WishList){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
        this.afs.collection(Constants.WishList).doc(prdct.wishitemid).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  //deletre and remove process here

  deleteTask(taskKey){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection(Constants.FireStoreDB).doc(currentUser.uid).collection(Constants.UserList).doc(taskKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  removeProductCart(cartId: any){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
        this.afs.collection(Constants.CartList).doc(cartId).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    // debugger;
    this.snapshotChangesSubscription.unsubscribe();
  }



//   getAllTasks(){
//     return new Promise<any>((resolve, reject) => {
//     //   let currentitem = this.afs.collection('UserList');
      
//     //   let currentUser = firebase.auth().currentUser;
//       this.snapshotChangesSubscription = this.afs.collection('UserList')
//       .get().subscribe(snapshots => {
//         resolve(snapshots);
//         snapshots.forEach((doc: any)=>{
         
//         });
//       })

//     });
//   }

//   getAllProducts(){
//     return  new Promise<any>((resolve, reject)=>{
//       this.snapshotChangesSubscription = this.afs.collection("ProductList")
//       .get()
//       .subscribe((snapshots) => {
        
//         resolve(snapshots)
       
//       }, error =>{
//          reject(error)
//       })
//     });
  
//   }
//   getAllWishList(){
//     return  new Promise<any>((resolve, reject)=>{
//       this.snapshotChangesSubscription = this.afs.collection("WishList")
//       .get()
//       .subscribe((snapshots) => {
        
//         resolve(snapshots)
       
//       }, error =>{
//          reject(error)
//       })
//     })
  
//   }

   
//   getAllProductCategories(){
//     return  new Promise<any>((resolve, reject)=>{
//       this.snapshotChangesSubscription = this.afs.collection("ProductCategoryList")
//       .get()
//       .subscribe((snapshots) => {
        
//         resolve(snapshots)
       
//       }, error =>{
//          reject(error)
//       })
//     })
  
//   }

  

//   getAllCartDetails(){
//     return  new Promise<any>((resolve, reject)=>{
//       this.snapshotChangesSubscription = this.afs.collection("CartList")//.doc(value.cartId)
//       .get()
//       .subscribe((snapshots) => {
        
//         resolve(snapshots)
       
//       }, error =>{
//          reject(error)
//       })
//     })
  
//   }


//   getProfileById(){
//     return  new Promise<any>((resolve, reject)=>{
//       let currentUser = firebase.auth().currentUser;
//       this.snapshotChangesSubscription = this.afs.collection("UserList").doc(currentUser.uid)
//       .get()
//       .subscribe((snapshots) => {
//         resolve(snapshots)
       
//       }, error =>{
//          reject(error)
//       })
//     });
//   }
  


//   getProductById(id: string){
//     console.log("UUUUID::::: "+id);
    
//     return  new Promise<any>((resolve, reject)=>{
//       this.snapshotChangesSubscription = this.afs.collection("ProductList").doc(id)
//       .get()
//       .subscribe((snapshots) => {
        
//         resolve(snapshots)
       
//       }, error =>{
//          reject(error)
//       })
//     });
//   }

//   getWishListById(id: string){
//     console.log("IDDLDLF: "+ id);
    
//     return  new Promise<any>((resolve, reject)=>{
//       this.snapshotChangesSubscription = this.afs.collection("WishList").doc(id)
//       .get()
//       .subscribe((snapshots) => {
        
//         resolve(snapshots)
       
//       }, error =>{
//          reject(error)
//       })
//     });
//   }
  
//   getAllCartByProId(productId: any){
//     return  new Promise<any>((resolve, reject)=>{
//       this.snapshotChangesSubscription = this.afs.collection("CartList").doc(productId)
//       .get()
//       .subscribe((snapshots) => {
        
//         resolve(snapshots)
       
//       }, error =>{
//          reject(error)
//       })
//     })
  
//   }
  



  // encodeImageUri(imageUri, callback) {
  //   var c = document.createElement('canvas');
  //   var ctx = c.getContext("2d");
  //   var img = new Image();
  //   img.onload = function () {
  //     var aux:any = this;
  //     c.width = aux.width;
  //     c.height = aux.height;
  //     ctx.drawImage(img, 0, 0);
  //     var dataURL = c.toDataURL("image/jpeg");
  //     callback(dataURL);
  //   };
  //   img.src = imageUri;
  // };

  // uploadImage(imageURI, randomId){
  //   return new Promise<any>((resolve, reject) => {
  //     let storageRef = firebase.storage().ref();
  //     let imageRef = storageRef.child('image').child(randomId);
  //     this.encodeImageUri(imageURI, function(image64){
  //       imageRef.putString(image64, 'data_url')
  //       .then(snapshot => {
  //         snapshot.ref.getDownloadURL()
  //         .then(res => resolve(res))
  //       }, err => {
  //         reject(err);
  //       })
  //     })
  //   })
  // }



}
