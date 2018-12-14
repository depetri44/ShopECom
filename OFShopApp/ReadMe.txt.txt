
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

