/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  HelloCordova
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"
#import "LocationManager.h"
#import <NetCorePush/NetCorePush.h>
#import <UserNotificationsUI/UserNotificationsUI.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNNotificationAction.h>
#import "Smartech.h"


@interface AppDelegate ()<NetCorePushTaskManagerDelegate,UNUserNotificationCenterDelegate>

@end


@implementation AppDelegate

- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    self.viewController = [[MainViewController alloc] init];
    [[NetCoreSharedManager sharedInstance] setUpAppGroup:@"group.com.netcore.SmartechSwift"];
    [LocationManager sharedInstance];
    [[NetCoreSharedManager sharedInstance] handleApplicationLaunchEvent:launchOptions forApplicationId:@"7cf037f55a38d0dc91e92272a5df1092"];
    [NetCorePushTaskManager sharedInstance].delegate = (id)self;
    
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [[NetCoreInstallation sharedInstance] netCorePushRegisteration:[[NetCoreSharedManager sharedInstance]getIdentity] withDeviceToken:deviceToken Block:^(NSInteger statusCode) {
    }];
    [[NetCoreSharedManager sharedInstance] printDeviceToken];
    
}

- (void)handleNotificationCustomPayload:(NSDictionary *)payload {
    NSError *error;
    
    [[NSNotificationCenter defaultCenter] postNotificationName:@"STHandleCustomPayloadNotification" object:nil userInfo:payload];
    
    if ([payload allKeys].count >0) {
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:payload options:NSJSONWritingPrettyPrinted error:&error];
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        NSString *messageString = [NSString stringWithFormat:@"CustomPayload = %@", jsonString];
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Custom Payload" message:messageString delegate:self cancelButtonTitle:@"Ok" otherButtonTitles:nil, nil];
        [alert show];
    }
    
    
    
    
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
    [[NetCorePushTaskManager sharedInstance] didReceiveRemoteNotification:userInfo];
    
}
- (void)userNotificationCenter:(UNUserNotificationCenter* )center didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void(^)(void))completionHandler  API_AVAILABLE(ios(10.0)) API_AVAILABLE(ios(10.0)) {
    
    NSLog(@"NetcoreSDK : UserNotificationCenter didReceiveNotificationResponse: %@", response );
    NSLog(@"NetcoreSDK : Identifier for Push Notification: %@", response.notification.request.identifier);
    
    [[NetCorePushTaskManager sharedInstance] userNotificationdidReceiveNotificationResponse:response];
}

- (void)handleNotificationOpenAction:(NSDictionary *)userInfo DeepLinkType:(NSString *)strType {
    
    
    
    [[NSNotificationCenter defaultCenter] postNotificationName:@"STHandleDeeplinkNotification" object:strType];
    
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Deeplink" message:strType delegate:self cancelButtonTitle:@"Ok" otherButtonTitles:nil, nil];
    [alert show];
    //
    //    if ([strType containsString:@"productdetail"]) {
    //
    //    }
    //    else if ([strType containsString:@"productscollection"]) {
    //
    //    }
}

@end
