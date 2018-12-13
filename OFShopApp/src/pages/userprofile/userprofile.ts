import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Profile } from '../../model/user_profile';
import { FirebaseService } from '../../service/firebase_service';
import { Constants } from '../../constatnt/constants';
//import { FirebaseService } from '../../service/firebase_service';

/**
 * Generated class for the UserprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {

  isDisabled: boolean;
  profile = {} as Profile;
  userid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService,
    public toastCtrl: ToastController,
    public authService: FirebaseService) {
      this.userid = window.localStorage.getItem(Constants.USERID)
      this.authService.getDataById(Constants.UserList, this.userid).then(res=>{
        this.profile.fname = res.data().FirstName;
        this.profile.lname = res.data().LastName;
        this.profile.mobileNum = res.data().MobileNumber;
        console.log("Profile Data: "+res.data().FirstName);
        console.log("Profile Data: "+res.data().LastName);
        console.log("Profile Data: "+res.data().MobileNumber);
        this.isDisabled = false;
      }, err=>{
        this.isDisabled = false;
        console.log("Profile Error: "+err);
        
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
  }
  async updateProfile(profile: Profile){

    if(this.isDisabled){

      this.isDisabled = false;
    }else{

      this.isDisabled = true;
    }

    // this.firebaseService.addUser(profile)
    // .then( res => {
    //   let toast = this.toastCtrl.create({
    //     message: 'User was updated successfully!',
    //     duration: 3000
    //   });
    //   toast.present();
    //   //this.resetFields();
    // }, err => {
    //   console.log(err)
    // })
  }

}
