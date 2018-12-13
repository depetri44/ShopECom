import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FirebaseService } from '../../service/firebase_service';
import { UserListService } from '../../service/user_list';
import { Product } from '../../model/products';
import { Tags } from '../../model/ProductTags';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the AddproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html'
})
export class AddproductPage {

  nextDay: Date;

  product = {} as Product;

  body: string;

  config: string;

  timeStamp: string;

  todate: string;

  tags: Tags;

  count: any;

  producttags: any;

  //orderForm: any;
  

  errorMessage: string = '';
  successMessage: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: FirebaseService, 
    public toastController: ToastController,
    public userListService: UserListService,
    public alertController:AlertController,
    private formBuilder: FormBuilder) {

      // this.orderForm = this.formBuilder.group({

      //   "product_id":["",Validators.required],
      //   "product_name:":["",Validators.required],
      //   "product_title":["",Validators.required],
      //   "price":["",Validators.required],
      //   "configuration":["",Validators.required],
      //   "body":["",Validators.required],
      //   "category":["",Validators.required],
      //   "featured_img":["",Validators.required],
      //   "availability":["",Validators.required],
      //   "product_owner":["",Validators.required],
      //   "product_owner_contact_1":["",Validators.required],
      //   "product_owner_contact_2":["",Validators.required],
      //   "published_at":["",Validators.required],
      //   "created_at":["",Validators.required],
      //   "updataed_at":["",Validators.required],
      //   "tags":["",Validators.required]

      // });

      this.count = 0;
      console.log("MilliSeconds: ", new Date().valueOf());

      console.log("Date: ", new Date());
      this.body = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
      this.config = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
  }

  onCategoryChange($event){
    //this.product.category = $event.;
  }

  AddProduct(product: Product){
  
    if(product){
      this.timeStamp = new Date().valueOf().toString();
      this.todate = new Date().toString();
      console.log("MilliSeconds: ", this.timeStamp);
      product.category = (this.product.category)?this.product.category:"1";
      product.body = this.body;
      product.configuration = this.config;
      product.product_id = this.timeStamp;
      product.published_at = this.todate;
      product.created_at = this.todate;
      product.updataed_at = this.todate;
      //this.transformVal(this.producttags);
      
      //product.add

      console.log(product);


      
      this.authService.addNewProduct(product)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your Product has been added!";
        this.showToast(this.successMessage);
        this.count = 0;
        //this.navCtrl.pop();
       // this.orderForm.reset();
      }, err => {
        console.log("Error::::",err);
        this.errorMessage = err.message;
        this.successMessage = "";
        this.presentAlert(this.errorMessage);
      })
    }else{
      this.errorMessage = "Please fill all the fields!";
      this.presentAlert(this.errorMessage);
    }
  }

  // transformVal(value: string) {
  //   return value
  //     .split(/([','][A-Za-z0-9-_]{5,})/)
  //     .map((val: string) => {
  //       //this.count++;
  //       //this.tags.tag_id = this.count;
  //       //this.tags.tag_text = val;

  //       console.log("Filtering:", val);
        

  //      return this.tags;
  //     });
  // }

  presentAlert(msg: string) {
    let alert = this.alertController.create({
      title: "Error",
      message: msg,
      buttons: [
        // {
        //   text: 'Cancel',
        //   role: 'cancel',
        //   handler: () => {
        //     //reject(false);
        //   }
        // },
        {
          text: 'Ok',
          handler: () => {
            //this.navCtrl.canGoBack();
          }
        }
      ]
    });
    alert.present();
  }
  showToast(msg: string){
    let toast = this.toastController.create({
      message: ""+msg,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

}
