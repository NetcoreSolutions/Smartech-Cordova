//
//  NotificationViewController.m
//  Content Extension
//
//  Created by Admin on 26/09/18.
//  Copyright © 2018 Manish Kumar. All rights reserved.
//

#import "NotificationViewController.h"
#import <UserNotifications/UserNotifications.h>
#import <UserNotificationsUI/UserNotificationsUI.h>

#import <NetCorePush/NetCorePush.h>

@interface NotificationViewController () <UNNotificationContentExtension>

@property (weak, nonatomic) IBOutlet UIView *customBgView;

@end

@implementation NotificationViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any required interface initialization here.
    [self setUpCarouselButtons];

    [[NetCoreNotificationService sharedInstance] contentViewDidLoad:_customBgView];
}

- (void)didReceiveNotification:(UNNotification *)notification {
    
    [[NetCoreNotificationService sharedInstance] didReceiveNotification:notification];
}

-(void)didReceiveNotificationResponse:(UNNotificationResponse *)response completionHandler:(void (^)(UNNotificationContentExtensionResponseOption))completion{
    
    [[NetCoreNotificationService sharedInstance] didReceiveNotificationResponse:response completionHandler:(void (^)(UNNotificationContentExtensionResponseOption))completion];
    
}

- (void)setUpCarouselButtons {
    
    if (@available(iOS 10.0, *)) {
        UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
        
        
        UNNotificationAction *actionBtn1 = [UNNotificationAction actionWithIdentifier:@"Next" title:@"Next" options:UNNotificationActionOptionNone];
        UNNotificationAction *actionBtn2 = [UNNotificationAction actionWithIdentifier:@"Previous" title:@"Previous" options:UNNotificationActionOptionNone];
        UNNotificationCategory *cat = [UNNotificationCategory categoryWithIdentifier:@"smartechPushCategory" actions:@[actionBtn1, actionBtn2] intentIdentifiers:@[] options:UNNotificationCategoryOptionNone];
        
        [center setNotificationCategories:[NSSet setWithObjects:cat, nil]];
        
        //    [center requestAuthorizationWithOptions:(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge) completionHandler:^(BOOL granted, NSError * _Nullable error){
        //        if( !error ){
        //            dispatch_async(dispatch_get_main_queue(), ^(void) {
        //                [[UIApplication sharedApplication] registerForRemoteNotifications];
        //            });
        //        }
        //    }];
    }
}

@end
