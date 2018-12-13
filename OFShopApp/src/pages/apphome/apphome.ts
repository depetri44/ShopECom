import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AddproductPage } from '../addproduct/addproduct'; 
import { ProductlistPage } from '../productlist/productlist';
import { FirebaseService } from '../../service/firebase_service';
import { ProductCategories } from '../../model/subcategories';
import { SearchproductPage } from '../searchproduct/searchproduct';
import { CartlistPage } from '../cartlist/cartlist';
import { Constants } from '../../constatnt/constants';

/**
 * Generated class for the ApphomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apphome',
  templateUrl: 'apphome.html',
})
export class ApphomePage {
  
  categoryList = Array();
  cartCountVal: number;
  userId: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: FirebaseService) {

      this.userId = window.localStorage.getItem(Constants.USERID);
      authService.getAllData(Constants.ProductCategoryList).then(res=>{
        res.forEach((doc:any)=>{
          let categories = {} as ProductCategories; 
          categories.product_category_id = doc.data().product_category_id;
          categories.product_category_title = doc.data().product_category_title;
          categories.product_category_subtitle = doc.data().product_category_subtitle;
          categories.product_category_imgUrl = doc.data().product_category_imgUrl;
  
          //console.log(categories);
  
          this.categoryList.push(categories);
             
        })
      });

      
     
  }

  viewCartPage(){
    this.navCtrl.setRoot(CartlistPage);
  }

  getAllCartList(){

    this.authService.getAllData(Constants.CartList).then(res=>{
      if(res){
        res.forEach((doc:any)=>{
          if(doc.data().userid == this.userId){
            this.cartCountVal++;
            console.log(this.cartCountVal);
            
          }
             
        })
      }else
      console.log("Error getting");
     
    });
  }

  goSearchPage(){
    this.navCtrl.push(SearchproductPage);
  }

  // addProductCategories()
  // {

  //   this.addCategories("1", 
  //       "Men",
  //     "Collections",
  //     "http://studiogravity.co/wp-content/uploads/2018/10/banner-3.jpg");

  //   this.addCategories("2", 
  //       "Women",
  //     "Collections",
  //     "http://anmozgroup.com/wp-content/uploads/2018/04/tailors.jpg");


  //   this.addCategories("3", 
  //       "Life Style and Fashion",
  //     "Collections",
  //     "http://www.acornhack2016.co.uk/includes/templates/acornhack2016//images/banner.jpg");


  //   this.addCategories("4", 
  //       "Laptops and Mobiles Electronics",
  //     "Collections",
  //     "http://www.yohuanelcomputers.com/wp-content/uploads/2017/07/Accessories-For-The-Computer.jpg");


  //   this.addCategories("5", 
  //       "Camera",
  //     "Collections",
  //     "https://dg1e9y8n8q0ml.cloudfront.net/ts1511272755/attachments/Category/194/Leica%20CL%20Category%20%20Banner%201200%20x%20470%202.jpg");


  //   this.addCategories("6", 
  //       "Camera, Mobile and Laptop Accesories",
  //     "Collections",
  //     "https://cdn.shopify.com/s/files/1/2586/9756/collections/accessories_banner_1350x.jpg?v=1521354235");
  // }

  addCategories(id: string, 
                title: string,
                subtitle: string,
                imgUrl: string ){
          this.authService.addFireCategories(id, title, subtitle, imgUrl);
  }

  
  addProductPage(){
    this.navCtrl.push(AddproductPage);
  }
  onCategoryClicked(id: any){
      this.navCtrl.push(ProductlistPage,{data:id});
  }


  ionViewDidEnter() {
    this.cartCountVal = 0;
    console.log(this.cartCountVal);
    this.getAllCartList();
  }

}
