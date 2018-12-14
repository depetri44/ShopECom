import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { DashboardPage } from  '../dashboard/dashboard';
import { LoginUser } from '../../model/loginuser';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../model/user';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../service/firebase_crud_service';
import { FirebaseService } from '../../service/firebase_service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User ;
  errorMessage: string = '';
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fAuth: AngularFireAuth, public toastController: ToastController,
    private firbaseService: FirebaseService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }

  async login(value: User){

    try{
      const result = await this.fAuth.auth.signInWithEmailAndPassword(value.email, value.password);
     //console.log("Result:::::",result.user.uid);
     window.localStorage.setItem("USERSESSION", "1"); 
     window.localStorage.setItem("USERID", result.user.uid);
     
      if(result){
        this.navCtrl.push(DashboardPage);
      }
    }catch(e){
      console.error(e);
      let toast = this.toastController.create({
        message: ""+e,
        duration: 5000,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: "Close"
      });
      toast.present();
    }
    
  } 
  register(){
    this.navCtrl.push('RegisterPage');
  }
}
