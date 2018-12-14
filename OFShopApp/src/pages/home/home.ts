import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FcmProvider } from '../../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rootPage:any = LoginPage;

  constructor(public navCtrl: NavController, toastCtrl: ToastController, platform: Platform) {
    this.navCtrl.push(LoginPage);


    //platform.ready().then(() => {

      // Get a FCM token
  //     fcm.getToken()

  //     // Listen to incoming messages
  //     fcm.listenToNotifications().pipe(
  //       tap(msg => {
  //         // show a toast
  //         const toast = toastCtrl.create({
  //           message: msg+"",
  //           duration: 3000
  //         });
  //         toast.present();
  //       })
  //     )
  //     .subscribe()
  //   });
  // 
    }

}
