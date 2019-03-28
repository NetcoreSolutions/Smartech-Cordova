/*
 @header Smartech.h
 
 @brief Smartech plugin that JavaScript file will call.
 
 @author Netcore Solutions
 @copyright  2019 Netcore Solutions
 @version    1.1.0 */


#import <Cordova/CDV.h>


@interface Smartech : CDVPlugin

- (void) addObserverForDeeplinkAndCustomPayload:(CDVInvokedUrlCommand *)command;

- (void) setIdentity:(CDVInvokedUrlCommand *)command;

- (void) clearIdentity:(CDVInvokedUrlCommand *)command;

- (void) login:(CDVInvokedUrlCommand *)command;

- (void) logout:(CDVInvokedUrlCommand *)command;

- (void) optOut:(CDVInvokedUrlCommand *)command;

- (void) profile:(CDVInvokedUrlCommand *)command;

- (void) track:(CDVInvokedUrlCommand *)command;

- (void) setUserLocation:(CDVInvokedUrlCommand *)command;

- (void) setPushToken:(CDVInvokedUrlCommand *)command;

- (void) getPushToken:(CDVInvokedUrlCommand *)command;

- (void) getPushTokeniOS:(CDVInvokedUrlCommand *)command;

- (void) getGUIDiOS:(CDVInvokedUrlCommand *)command;

- (void) getNotificationsiOS:(CDVInvokedUrlCommand *)command;

@end
