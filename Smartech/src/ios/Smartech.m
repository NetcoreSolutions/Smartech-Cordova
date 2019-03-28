/*
 @header Smartech.m
 
 @brief Smartech Plugin Implementation.
 
 @author Netcore Solutions
 @copyright  2019 Netcore Solutions
 @version    1.1.0 */


#import <Cordova/CDV.h>
#import <NetCorePush/NetCorePush.h>

static NSString *const STHandleDeeplinkNotification = @"STHandleDeeplinkNotification";
static NSString *const STHandleCustomPayloadNotification = @"STHandleCustomPayloadNotification";

@interface Smartech : CDVPlugin {
    // Member variables go here.
}

@end


@implementation Smartech

- (void)addObserverForDeeplinkAndCustomPayload:(CDVInvokedUrlCommand *)command {
    
    CDVPluginResult *pluginResult = nil;
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleDeeplink:) name: STHandleDeeplinkNotification object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleCustomPayload:) name: STHandleCustomPayloadNotification object:nil];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setIdentity:(CDVInvokedUrlCommand *)command {
    
    CDVPluginResult *pluginResult = nil;
    NSString* strIdentity = [command.arguments objectAtIndex:0];
    [[NetCoreSharedManager sharedInstance] setUpIdentity:strIdentity];
    
    if (strIdentity != nil && [strIdentity length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:strIdentity];
    }
    else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)clearIdentity:(CDVInvokedUrlCommand *)command {
    
    CDVPluginResult *pluginResult = nil;
    [[NetCoreSharedManager sharedInstance] clearIdentity];
    
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)login:(CDVInvokedUrlCommand *)command {
    
    CDVPluginResult *pluginResult = nil;
    NSString* strIdentity = [command.arguments objectAtIndex:0];
    [[NetCoreInstallation sharedInstance]netCorePushLogin:strIdentity Block:nil];
    
    if (strIdentity != nil && [strIdentity length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:strIdentity];
    }
    else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)logout:(CDVInvokedUrlCommand *)command {
    
    CDVPluginResult *pluginResult = nil;
    
    [[NetCoreInstallation sharedInstance] netCorePushLogout:^(NSInteger statusCode) {
        
    }];
    
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)optOut:(CDVInvokedUrlCommand *)command {
    
    CDVPluginResult *pluginResult = nil;
    bool flag = [[command.arguments objectAtIndex:0] boolValue];
    [[NetCoreSharedManager sharedInstance] optOut:flag];
    
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)profile:(CDVInvokedUrlCommand *)command {
    
    CDVPluginResult *pluginResult = nil;
    NSDictionary *profile = [command.arguments objectAtIndex:0];
    
    [[NetCoreInstallation sharedInstance]netCoreProfilePush:[[NetCoreSharedManager sharedInstance]getIdentity] Payload:(NSMutableDictionary *)profile Block:nil];
    
    if (profile != nil) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)track:(CDVInvokedUrlCommand*)command {
    
    CDVPluginResult *pluginResult = nil;
    NSString* eventName = [command.arguments objectAtIndex:0];
    NSDictionary* eventValue = [command.arguments objectAtIndex:1];
    
    [[NetCoreAppTracking sharedInstance] trackEventWithCustomPayload:eventName Payload:(NSMutableDictionary *)eventValue Block:^(NSInteger statusCode) {
    }];
    
    if (eventName != nil && [eventName length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:eventName];
    }
    else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setUserLocation:(CDVInvokedUrlCommand*)command {
    
    CDVPluginResult *pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setPushToken:(CDVInvokedUrlCommand*)command {
    
    CDVPluginResult *pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getPushToken:(CDVInvokedUrlCommand*)command {
    
    CDVPluginResult *pluginResult = nil;
    NSString* deviceToken = [[NetCoreSharedManager sharedInstance] getDeviceToken];
    
    if (deviceToken != nil && [deviceToken length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:deviceToken];
    }
    else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getGUID:(CDVInvokedUrlCommand*)command {
    
    CDVPluginResult *pluginResult = nil;
    NSString* guid = [[NetCoreSharedManager sharedInstance]getGUID];
    
    if (guid != nil && [guid length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:guid];
    }
    else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getNotifications:(CDVInvokedUrlCommand*)command {
    
    CDVPluginResult *pluginResult = nil;
    NSArray* notifications = [[NetCoreSharedManager sharedInstance
                               ]getNotifications];
    if (notifications != nil) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:notifications];
    }
    else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)handleDeeplink:(NSNotification *)notification {
    
    NSString *js = [NSString stringWithFormat:@"cordova.fireDocumentEvent('onDeepLink', {'deeplink':'%@'});",notification.object];
    [self.commandDelegate evalJs:js];
}

- (void)handleCustomPayload:(NSNotification *)notification {
    
    NSString *js = [NSString stringWithFormat:@"cordova.fireDocumentEvent('onCustomPayload', {'onCustomPayload':'%@'});", notification.userInfo[@"name"]];
    [self.commandDelegate evalJs:js];
}

@end
