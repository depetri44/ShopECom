#ShopECom

Demo for E-Commerce Application using Ionic Framework.

Requirements
    Ionic 3
    Angular 5
    Visual Studio Code - 1.29.1

Author
  SaravanaPandian Sivagnanam

Getting Started

App Features

    Sign In/ Sign Up
    Password recovery
    Homepage Slider
    Filter Items by Categories/Subcategories
    Add products to Cart
    Place orders
    Calculate Shipping Fee after Zone/Subzone selection
    Account Management (Payment, Addresses, Profile, Change Password, Logout)
    Order List/Details
    Wish list / Favorites
    Search Items by keywords
    Cash On Delivery
    PWA support
    View Items On Sale, Featured.

    Manage Orders, View Order Details, Update Order Status
    Manage Categories/Subcategories
    Manage Zones/Subzones
    Manage Users/Customers.
    Manage Slider Images
    Login/Logout
    Password Recovery

Key Items

    Multiple Layouts
    Tinder cards
    Sliders
    Cards
    Lists

Firebase backend
Owned and maintained by Google, Firebase is a platform with different services that helps us develop applications faster. 
Firebase offers many useful features like Real-time Database, push notification, Firebase Analytics, Firebase Authentication, 
Firebase Cloud Messaging, Firebase Storage, Firebase Test Lab for Android, Firebase App Indexing and many more.
 
This template uses Firebase as a backend, which means you won’t have to write al

#Demo

Package

  1. App Source Code

  2. Documentation

  3. Technical Details

Ionic framework is an open source front-end SDK for developing hybrid mobile apps with HTML5, CSS and JavaScript. Ionic is focused mainly on the look and feel, and UI interaction of your app. Cordova is a platform to build Native Mobile Applications using HTML5, CSS and JavaScript.

Backend was built with Google Firebase.



Versioning

  https://github.com/saravanan72/ShopECom.git

Some Keys to Plugin

To access firebase

    npm install firebase angularfire2

to get LatLng

	ionic cordova plugin add cordova-plugin-geolocation

	npm install --save @ionic-native/geolocation

to get address from latlng
	
	ionic cordova plugin add cordova-plugin-nativegeocoder

	npm install --save @ionic-native/native-geocoder

if cordova not available then run the plugin by(like Geo Error: cordova_not_available)

	ionic cordova platform add browser

	and

	ionic cordova run browser    
	
	
if getting issue like Geo Error: exec proxy not found for :: NativeGeocoder :: reverseGeocode

	cordova plugin add cordova-plugin-nativegeocoder	

