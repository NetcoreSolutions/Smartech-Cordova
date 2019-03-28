var exec = require('cordova/exec');

    var PLUGIN_NAME = 'Smartech';

    exports.addObserverForDeeplinkAndCustomPayload = function () {
        exec(null, null, PLUGIN_NAME, 'addObserverForDeeplinkAndCustomPayload', []);
    };
    exports.setIdentity = function (identity, success, error) {
        exec(success, error, PLUGIN_NAME, 'setIdentity', [identity]);
    };
    exports.clearIdentity = function (success, error) {
        exec(success, error, PLUGIN_NAME, 'clearIdentity',[]);
    };
    exports.login = function (identity, success, error) {
        exec(success, error, PLUGIN_NAME, 'login', [identity]);
    };
    exports.logout = function (success, error) {
        exec(success, error, PLUGIN_NAME, 'logout',[]);
    };
    exports.track = function (eventName, payload, success, error) {
        exec(success, error, PLUGIN_NAME, 'track', [eventName,payload]);
    };
    exports.profile = function (profilePayload, success, error) {
                exec(success, error, PLUGIN_NAME, 'profile', [profilePayload]);
    };
    exports.optOut = function (optFlag, success, error) {
            exec(success, error, PLUGIN_NAME, 'optOut', [optFlag]);
    };
    exports.setUserLocation = function (latitude,longitude, success, error) {
            exec(success, error, PLUGIN_NAME, 'setUserLocation', [latitude,longitude]);
    };
    exports.setPushToken = function (token, success, error) {
            exec(success, error, PLUGIN_NAME, 'setPushToken', [token]);
    };
    exports.getPushToken = function (success, error) {
            exec(success, error, PLUGIN_NAME, 'getPushToken', []);
    };
    exports.getGUID = function (success, error) {
            exec(success, error, PLUGIN_NAME, 'getGUID', []);
    };
    exports.getNotifications = function (notificationCount,success, error) {
            exec(success, error, PLUGIN_NAME, 'getNotifications', [notificationCount]);
    };