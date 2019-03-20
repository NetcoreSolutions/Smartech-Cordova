

## [![Netcore Logo](https://netcore.in/wp-content/themes/netcore/img/Netcore-new-Logo.png)](http:www.netcore.in)   Smartech Cordova Plugin 
### Prerequisites
##### 1. google-services.json file from [Firebase Console](https://console.firebase.google.com/)
##### 2. Server Key​​ from ​Firebase Console
##### 3. App Id from Smartech Panel
**Note:** Minimum SDK version (minSdkVersion) available in the build.gradle file of the app should be at least 16 (Jelly Bean) or above.

### Integration Steps:
#### Setting up FCM in the native android application:
##### 1. Add google-services.json file in /ReactNativeProject/android/app directory of the project.
##### 2. Adding dependencies given below in ​ build.gradle file of the project​.​

```java
classpath 'com.android.tools.build:gradle:3.3.1'
classpath 'com.google.gms:google-services:4.2.0'
```
##### 3. Adding dependencies in the build.gradle file of the app

```java
implementation 'in.netcore.smartechfcm:smartech-fcm:1.2.0'
implementation 'com.google.firebase:firebase-messaging:17.3.4'
implementation 'com.google.code.gson:gson:2.8.0'
implementation 'com.google.android.gms:play-services-ads:17.1.1'
```
##### 4. Adding below code in the ​ build.gradle file of the app​​.

```java
apply plugin: 'com.google.gms.google-services'
```

**Note:​​**

-   One can avoid using  **‘com.google.android.gms:play-services-ads’**  dependency if an app does not want Smartech to fetch Advertising Id of the device.
    
-   If present, remove  **‘com.firebase:firebase-jobdispatcher:0.8.5’**  dependency from the build.gradle of the app.


#### To register device for push notifications
To register the device for receiving push notifications from Smartech panel​, add given snippet inside the **onCreate method of the ``Application`` class in android native​​.**
```java
NetcoreSDK.register(this, <app_id>);
```

#### To use custom push notification icon
SDK uses launcher icon for push notifications by default and in order to change it, use a custom icon by adding given snippet inside ​**onCreate method of the ``Application`` class in android native​​.**
```java
NetcoreSDK.setPushIcon(context, <path_to_drawable_icon>);

e.g. 
NetcoreSDK.setPushIcon(context, R.drawable.ic_push_icon);
```
**Note:** The notification icon being used should strictly be in .png format as per [Google’s guidelines (https://developer.android.com/guide/practices/ui_guidelines/icon_design_status_bar)​. Preferable size for the push notification icons are mentioned below.
```java
drawable-mdpi		:	24 x 24
drawable-hdpi		:	36 x 36
drawable-xhdpi		:	48 x 48
drawable-xxhdpi		:	72 x 72
drawable-xxxhdpi	:	96 x 96
```

#### To implement push notifications in existing FCM class
To use push notifications from Smartech panel along with existing set up of the FCM class, add given snippet ​**inside the FCM receiver class​​**.
```java
boolean pushFromSmartech = NetcoreSDK.handleNotification(context, remoteMessage.getData());
```
**Note​​:** The method returns a boolean value.

- Returns **true​**, if the push notification is received from the Smartech panel. It will also render the push notification without any extra efforts further.

- Return ​**false​**, if the push notification is not received from the Smartech panel. In this case, handle the push notification at your end as per the requirement.

#### To set existing FCM token
To set existing FCM token of the application to the SDK, **add given snippet just before ‘register’ method in the Application class of the app**.
```java
NetcoreSDK.setPushToken(context, <token_string>);

e.g.
NetcoreSDK.setPushToken(context, <token_string>);
NetcoreSDK.register(this, <app_id>);
```

#### To implement deeplink in the application
To implement deeplink in the application, add given snippet **inside AndroidManifest.xml file with in the Activity Tag**.
```xml
<intent-filter>
	<action android:name = "android.intent.action.VIEW"/>
	<category android:name = "android.intent.category.DEFAULT"/>
	<category android:name = "android.intent.category.BROWSABLE"/>
	<data android:scheme = "<scheme>" android:host= "<host>"/>
</intent-filter>
    
e.g.
<intent-filter>
	<action android:name= "android.intent.action.VIEW"/>
	<category android:name= "android.intent.category.DEFAULT"/>
	<category android:name= "android.intent.category.BROWSABLE"/>
	<data android:scheme = "smartech" android:host= "products"/>
</intent-filter>
``` 

 #### To fetch Advertising Id

To fetch Advertising Id using Smartech SDK of the device, add given snippet  **in the AndroidManifest.xml file inside the application tag**.

```xml
<meta-data
	android:name="SMT_USE_AD_ID"
	android:value="<value>"/>
	
e.g.
<meta-data
	android:name="SMT_USE_AD_ID"
	android:value="1"/>
```

**Note​​:**  The method accepts either  **‘0’**  or  **‘1’**  as value.

-   If an app wants Smartech SDK to fetch Advertising Id of the device, use  **‘1’**  as value.
    
-   If an app does not want Smartech SDK to fetch Advertising Id of the device, use  **‘0’**  as value.
