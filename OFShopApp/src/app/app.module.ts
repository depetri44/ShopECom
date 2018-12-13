import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MomentModule } from 'ngx-moment';
import { MyApp } from './app.component';


import { FIREBASE_CONFIG } from '../app/app.firebase.config';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseService } from '../service/firebase_service';
import { AuthService } from '../service/firebase_crud_service';
import { AngularFireModule } from 'angularfire2';
import { UserListService } from '../service/user_list';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ApphomePage } from '../pages/apphome/apphome';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { UserprofilePage } from '../pages/userprofile/userprofile';

import { ProductlistPage } from '../pages/productlist/productlist';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { CartlistPage } from '../pages/cartlist/cartlist';
import { SearchproductPage } from '../pages/searchproduct/searchproduct';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { RegisterPageModule } from '../pages/register/register.module';
import { CheckoutProductPage } from '../pages/checkout-product/checkout-product';
import { Geolocation } from '@ionic-native/geolocation';
import { FcmProvider } from '../providers/fcm/fcm';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    DashboardPage,
    ApphomePage,
    UserprofilePage,
    ProductlistPage,
    WishlistPage,
    CartlistPage,
    SearchproductPage,
    ProductDetailsPage,
    CheckoutProductPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    MomentModule,
    RegisterPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DashboardPage,
    ApphomePage,
    UserprofilePage,
    ProductlistPage,
    WishlistPage,
    CartlistPage,
    SearchproductPage,
    ProductDetailsPage,
    CheckoutProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseService,
    AuthService,
    UserListService,
    Geolocation,
    FcmProvider
  ]
})
export class AppModule {
}
