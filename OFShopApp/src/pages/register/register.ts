import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LoginUser } from '../../model/loginuser';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../model/user';
import { ToastController } from 'ionic-angular';
import { FirebaseService } from '../../service/firebase_service'
import { UserListService } from '../../service/user_list'
import { AlertController } from 'ionic-angular';
import { Constants } from '../../constatnt/constants';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  errorMessage: string = '';
  successMessage: string = '';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public fAuth: AngularFireAuth,
              public authService: FirebaseService, 
              public toastController: ToastController,
              public userListService: UserListService,
              public alertController:AlertController) {

                this.authService.getAllData(Constants.UserList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(value: User){
    try{
      const result = await this.fAuth.auth.createUserWithEmailAndPassword(value.email, value.password);
      value.userid = result.user.uid;
      console.log("Result: ",value.userid);

      this.authRegisterUser(value);
      this.showToast("User Created");
      this.navCtrl.setRoot(LoginPage);
    }catch(e){
      this.presentAlert(e);
      console.error("Error: ",e);
      
    }

  }
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

  authRegisterUser(value: User){

    // this.authService.doRegister(value)
    //  .then(res => {
    //    console.log(res);
    //    this.errorMessage = "";
    //    this.successMessage = "Your account has been created. Please log in.";
    //  }, err => {
    //    console.log(err);
    //    this.errorMessage = err.message;
    //    this.successMessage = "";
    //  })

    // this.userListService.addNote(value).then(ref => {
    //   this.navCtrl.setRoot(LoginPage);
    // })

    this.authService.createAccount(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created. Please log in.";
     }, err => {
       console.log("Error::::",err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }
  

}
