

# Integrating the Smartech SDK

1. Import following file in App Delegate File

```objective-c
#import <NetCorePush/NetCorePush.h>
```

2. Add NetCore Application AppID in support in Finish Launching Methods (AppDelegate file)

```objective-c
[[NetCoreSharedManager  sharedInstance] setUpAppGroup:@""];
[[NetCoreSharedManager  sharedInstance] handleApplicationLaunchEvent:launchOptions forApplicationId:@""];
//set up push delegate
[NetCorePushTaskManager  sharedInstance].delegate = (id)self;
```

3. Register Device With NetCore SDK (AppDelegate file)

```objective-c
-(void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [[NetCoreInstallation  sharedInstance] netCorePushRegisteration:@"" withDeviceToken:deviceToken Block:^(NSInteger statusCode) {
    }];
}
```

### For Normal Push Notifications

````objective-c
//Handle Remote/Local Notification Delegate Events (AppDelegate file)

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    [[NetCorePushTaskManager  sharedInstance] didReceiveRemoteNotification:userInfo];
}
````

### To Handle URL Link



```objective-c

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    return  true;
}

```

### To Handle Deep Link

You can receive push notifications with deeplink, in order to handle deeplink you need to add an optional delegate method handleNotificationOpenAction inside your App Delegate.

```objective-c

//For Handling deep link
- (void)handleNotificationOpenAction:(NSDictionary *)userInfo DeepLinkType:(NSString *)strType
{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"STHandleDeeplinkNotification" object:strType];
}

```
## To Handle Custom Payload

You can receive push notifications with custom payload, in order to handle custom payload you need to add an optional delegate method handleNotificationCustomPayload inside your App Delegate.

```objective-c

//For Handle custom payload
- (void)handleNotificationCustomPayload:(NSDictionary *)payload
{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"STHandleCustomPayloadNotification" object:nil userInfo:payload];
}

```

### For Rich Push Notifications

#### Configuration Changes

```objective-c

1) Add “Notification Service Extension” to your app. File->New->Target- >Notification Service Extension.

2) Click Next and when asked to “Activate”, Click Activate.

3) Add “App Groups” to your apps Capabilities(Add one group with name "<group.com.CompanyName.ProductName>").

4) Enable App groups in Service Extension too and select group with name "<group.com.CompanyName.ProductName>".

5) If App group is not activated on the provisioning profile you are using, then

6) Enable App groups in your provisioning profile from your Apple Developer’s account and replace the profile with the new one. Or,

7) In your apps’s, Target->General-> Signing, Select “Automatically manage signing” and enable App groups by going to Target->Capabilities->App group. This will automatically add app groups capability to you provisioning profile.

8) Set the deployment target to minimum of 10.0.

```
#### Implementation Changes



Remove all the code written in “NotificationService” implementation class.



1) Import NetCore Framework into Extension

```objective-c

#import <NetCorePush/NetCorePush.h>

```

2) Handle Notification Request

```objective-c

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    [[NetCoreNotificationService  sharedInstance] setUpAppGroup:@""];
    [[NetCoreNotificationService  sharedInstance] didReceiveNotificationRequest:request withContentHandler:^(UNNotificationContent *contentToDeliver) {contentHandler(contentToDeliver);
    }];
}

```

3) Handle Notification Service Time Expire

```objective-c

- (void)serviceExtensionTimeWillExpire {
    [[NetCoreNotificationService  sharedInstance] serviceExtensionTimeWillExpire];
}

```



### For Carousel Push Notifications

#### Configuration Changes

```objective-c
1) Add “Notification Content Extension” to your app. File->New->Target->Notification Content Extension.

2) Click Next and when asked to “Activate”, Click Activate.

3) Add “App Groups” to your apps Capabilities(Add one group with name "<group.com.CompanyName.ProductName>").

4) Enable “App Groups” in Content Extension too and select group with name "<group.com.CompanyName.ProductName>".

5) Set the deployment target to minimum of 10.0.
```



#### Implementation Changes

```objective-c
1) Replace “MainInterface.storyboard” of Content Extension with the one provided in "Rich Files".

2) In “Info.plist” file of Content Extension, replace “UNNotificationExtensionCategory” value with “SmartechPushCategory”.

3) In “Info.plist” file of Content Extension, add “UNNotificationExtensionDefaultContentHidden” Boolean value with “NO”.

4) Replace “NotificationViewController” class files from the "Rich Files" into your project.

```





### Deployment Over Apple Store

Add Following runscript in your application target ,when you are deploying application over apple store,this run script use remove unused architecture in release mode

```shell

APP_PATH="${TARGET_BUILD_DIR}/${WRAPPER_NAME}"



# This script loops through the frameworks embedded in the application and

# removes unused architectures.

find "$APP_PATH" -name '*.framework' -type d | while read -r FRAMEWORK

do

FRAMEWORK_EXECUTABLE_NAME=$(defaults read "$FRAMEWORK/Info.plist" CFBundleExecutable)

FRAMEWORK_EXECUTABLE_PATH="$FRAMEWORK/$FRAMEWORK_EXECUTABLE_NAME"

echo "Executable is $FRAMEWORK_EXECUTABLE_PATH"



EXTRACTED_ARCHS=()



for ARCH in $ARCHS

do

echo "Extracting $ARCH from $FRAMEWORK_EXECUTABLE_NAME"

lipo -extract "$ARCH" "$FRAMEWORK_EXECUTABLE_PATH" -o "$FRAMEWORK_EXECUTABLE_PATH-$ARCH"

EXTRACTED_ARCHS+=("$FRAMEWORK_EXECUTABLE_PATH-$ARCH")

done


echo "Merging extracted architectures: ${ARCHS}"

lipo -o "$FRAMEWORK_EXECUTABLE_PATH-merged" -create "${EXTRACTED_ARCHS[@]}"

rm "${EXTRACTED_ARCHS[@]}"



echo "Replacing original executable with thinned version"

rm "$FRAMEWORK_EXECUTABLE_PATH"

mv "$FRAMEWORK_EXECUTABLE_PATH-merged" "$FRAMEWORK_EXECUTABLE_PATH"


done
```
