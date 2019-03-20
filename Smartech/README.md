# [![Netcore Logo](https://netcore.in/wp-content/themes/netcore/img/Netcore-new-Logo.png)](http:www.netcore.in)   Smartech Cordova Plugin 

## Install the Plugin

Follow the [installing instructions](https://github.com/NetcoreSolutions/Smartech-Cordova/blob/master/docs/install.md)

```bash
$ cordova plugin add smartech-cordova
```
#### To set user identity
In order to identify a user, set unique user identity by adding given snippet as per the requirement.
```javascript
Smartech.setIdentity(<unique_user_identity>,function(response){
		//Your code here
	}, function(error){  
		});
```

#### To clear user identity
In order to wipe out user identity from the SDK, add given snippet as per the requirement.
```javascript
Smartech.clearIdentity(function(response){
		//Your code here
	}, function(error){  
		});
```

#### To capture user login
To capture login activity of the user, add given snippet inside the **js** file of your project when the user gets logged in successfully.
```javascript
Smartech.login(<unique_user_identity>,function(response){
		//Your code here
	}, function(error){  
		});
```
#### To capture user logout
To capture logout activity of the user, add given snippet inside the **js** file when the user gets logged out successfully.
```javascript
Smartech.logout(function(response){
		//Your code here
	}, function(error){  
		});
Smartech.clearIdentity(function(response){
		//Your code here
	}, function(error){  
		});
```
**Note:​​** Avoid calling **clearIdentity()** method if one wants to track user activity even if user has logged out of the application.

#### To capture custom activity
To capture custom activity performed by the user, add given snippet as per the requirement.
```java
Smartech.track(<event_name>, payload,function(response){
		//Your code here
	}, function(error){  
		});

E.g.
const payload =  {
    name: 'Galaxy', 
    description: '20gram bars', 
    id: '1'
};
Smartech.track("Add To Cart",payloadData,function(response){
		//Your code here
	}, function(error){  
		});
```

#### To capture user attributes
To capture and map user attributes, add given snippet as per the
requirement.
```java
Smartech.profile(<profile_object>,function(response){
		//Your code here
	}, function(error){  
		});

E.g. 
const payload =  {
	    NAME: "User Name",
	    EMAILID: "abc@xyz.com",
	    AGE: "30", 
	    MOBILE: "4545748"
      };
Smartech.profile(payloadData,function(response){
		//Your code here
	}, function(error){  
		});
```
**Note:** Use attribute name in capital letters as shown above.


#### To fetch delivered push notifications
To fetch delivered push notifications, add given snippet as per the requirement.
```java
Smartech.getNotifications(<count>,function(response){
		//Your code here
	}, function(error){  
		});
```
**Note:** The method returns a **JSONArray** of delivered push notifications for the user.


#### To opt out user from being tracked (GDPR Policy)
If the end user wants to opt out of being tracked, add given snippet as per the requirement.
```javascript
Smartech.optOut(<boolean_flag>,function(response){
		//Your code here
	}, function(error){  
		});
```
**Note​​:** The method accepts a boolean value.

- If an end user wants to opt out, the flag should be passed as **true**. Once the user opts out, SDK will not be able to track that particular user further and no communications will be received by that user.

- If an end user wants to opt in, the flag should be passed as **false**. Once the user opts in, SDK will be able to track that particular user further and next communications will be received by that user.

#### To implement location tracking
In order to track user location and pass it further to Smartech, add given snippet as per the requirement.
```javascript
Smartech.setUserLocation(<double_lat>, <double_long>,function(response){
		//Your code here
	}, function(error){/*Handle error here */}
);
```
**Note:** The method mentioned above accepts 3 parameters including context, latitude & longitude. **Data type of ‘latitude’ & ‘longitude’ should compulsorily be 'floating value'**. In case if any parameter is null, SDK will not be able to persist user location.




#### To get GUID of the user
To obtain GUID of the user from the SDK, add given snippet as per the requirement.
```javascript
Smartech.getGUID(function(response){
		//Your code here
	}, function(error){  
		});
```
#### To get FCM token of the user
To obtain the FCM token of the user from the SDK, add given snippet as per the requirement.
```javascript
Smartech.getPushToken(function(response){
		//Your code here
	}, function(error){  
		});
```
