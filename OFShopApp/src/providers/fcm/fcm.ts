import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseOptions } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { Platform } from 'ionic-angular';
import { FirebaseOperation } from '@angular/fire/database/interfaces';

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: FirebaseOptions,
    public afs: AngularFirestore,
    private platform: Platform
  ) {}

  // Get permission from the user
  async getToken() {
    
      let token;

      if (this.platform.is('android')) {
        token = await this.firebaseNative.getToken()
      } 

      if (this.platform.is('ios')) {
        token = await this.firebaseNative.getToken();
        await this.firebaseNative.grantPermission();
      } 
      
      return this.saveTokenToFirestore(token)
   }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices')
  
    const docData = { 
      token,
      userId: 'testUser',
    }
  
    return devicesRef.doc(token).set(docData)
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }
}
