import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular/index';
declare var cordova: any;

/*
  Generated class for the Aes256Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Aes256Provider {
  secureKey: String = '123456789101234567890123456789011'; // Any string, the length should be 32
  secureIV: String = '1234567891123456'; // Any string, the length should be 16

  constructor(private platform: Platform) {
    // To generate random secure key
    this.generateSecureKey('some string');  // Optional
      
    // To generate random secure IV
    this.generateSecureIV('some string');   // Optional
    
    // let data = "test";
    // this.encrypt(this.secureKey, this.secureIV, data); 
    // let encryptedData = "AE#3223==";
    // this.decrypt(this.secureKey, this.secureIV, encryptedData);  
  }

  doEncryptData(data: string){
    this.encrypt(this.secureKey, this.secureIV, data);
  }

  doDecryptData(encryptedData: string){
    this.decrypt(this.secureKey, this.secureIV, encryptedData);
  }

  encrypt(secureKey, secureIV, data) {
    this.platform.ready().then(() => {
      cordova.plugins.AES256.encrypt(secureKey, secureIV, data,
        (encrypedData) => {
          console.log('Encrypted Data----', encrypedData);
          this.decrypt(this.secureKey, this.secureIV, encrypedData);
        }, (error) => {
          console.log('Error----', error);
        });
    });
  }

  decrypt(secureKey, secureIV, encryptedData) {
    this.platform.ready().then(() => {
      cordova.plugins.AES256.encrypt(secureKey, secureIV, encryptedData,
        (decryptedData) => {
          console.log('Decrypted Data----', decryptedData);
        }, (error) => {
          console.log('Error----', error);
        });
    });
  }
  
  generateSecureKey(password) {
    this.platform.ready().then(() => {
      cordova.plugins.AES256.generateSecureKey(password,
        (secureKey) => {
          this.secureKey = secureKey;
          console.log('Secure Key----', secureKey);          
        }, (error) => {
          console.log('Error----', error);
        });
    });
  }
  
  generateSecureIV(password) {
    this.platform.ready().then(() => {
      cordova.plugins.AES256.generateSecureIV(password,
        (secureIV) => {
          this.secureIV = secureIV;
          console.log('Secure IV----', secureIV);          
        }, (error) => {
          console.log('Error----', error);
        });
    });
  }

}
