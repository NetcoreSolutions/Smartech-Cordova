angular.module('cordova_smartech.utils.controller', [])
  .controller('MainCtrl', function($scope, $stateParams, $rootScope, $state, $ionicHistory, smartechService, $cordovaToast) {

    $scope.ids = {
         identity: "",
         token: ""
       };
       $scope.events = {
         eventName: "Custom Payload",
         customPayload: "{'name':'Galaxy','description':'20gram bars','id':'1'}"
       };
       $scope.payloadata = {
           name: "Galaxy",
           description: "20gram bars",
           id: "1",
           product_id: 101
       };

       $scope.profile = {
           NAME: "",
           EMAILID: "",
           AGE: "",
           MOBILENO: "",
           DOB: "",
           SALARY: "",
           WEBSITE: ""
       };

       $scope.location = {
         latitude: "",
         longitude: ""
       };

       //login methods
       $scope.login= function() {
         var identity = $scope.ids.identity;
         smartechService.login(identity)
               .then(function(result){
                 console.log(result);
                 $state.go('home');
               });
       }
       $scope.skip= function() {
         $state.go('home');
       }
       $scope.logout= function() {
           smartechService.logout()
               .then(function(result) {
                 console.log(result);
                 $state.go('login');
               });
       }
       //home methods

       $scope.track= function(eventName) {
          // var eventName = $scope.events.eventName;
           var payload = $scope.payloadata;
           smartechService.track(eventName, payload)
           .then(function(result) {
             console.log(result);
           })
           ;
       }

       $scope.profileUpdate= function() {
           $state.go('profile');
       }
       $scope.profileSave= function() {
           var profilePayload = {
               NAME: $scope.profile.NAME,
               EMAILID: $scope.profile.EMAILID,
               AGE: $scope.profile.AGE,
               MOBILENO: $scope.profile.MOBILENO,
               DOB: $scope.profile.DOB,
               SALARY: $scope.profile.SALARY,
               WEBSITE: $scope.profile.WEBSITE
           };
           smartechService.profile(profilePayload)
               .then(function(result) {
                 console.log(result);
                   var message = "Data Save Successfully!";
                   var title = "Information";
                   var buttonName = "Ok";
                   navigator.notification.alert(message, alertCallback, title, buttonName);
                   function alertCallback() {
                     console.log("Alert is Dismissed!");
                     $state.go('home');
                   }

               })
               ;
       }

       $scope.optOut= function(flag) {
           smartechService.optOut(flag)
               .then(function(result) {
                 console.log(result);
               })
               ;
       }

       $scope.customData= function() {
           $state.go('custom');
       }
       $scope.saveCustom= function() {
           var eventName = $scope.events.eventName;
           var payload = $scope.events.customPayload;
           smartechService.track(eventName, payload)
           .then(function(result){
             console.log(result);
           })
           ;
       }
       $scope.otherFunctions= function() {
           $state.go('other');
       }

       $scope.setUserLocation= function() {
           var latitude = $scope.location.latitude;
           var longitude = $scope.location.longitude;
           smartechService.setUserLocation(latitude, longitude)
           .then(function(result) {
             console.log(result);
           })
           ;
       }

       $scope.setPushToken= function() {
           var token = $scope.ids.token;
           smartechService.setPushToken(token)
           .then(function(result) {
             console.log(result);
           })
           ;
       }

       $scope.getPushToken= function() {
           smartechService.getPushToken()
               .then(function(result) {
                 console.log(result);
                 var message = result;
                 var title = "Push Token";
                 var buttonName = "Ok";
                 navigator.notification.alert(message, alertCallback, title, buttonName);
                 function alertCallback() {
                   console.log("Alert is Dismissed!");
                 }
               })
               ;

       }
       $scope.getGUID= function() {
           smartechService.getGUID()
               .then(function(result) {
                 console.log(result);
                 var message = result;
                 var title = "GUID";
                 var buttonName = "Ok";
                 navigator.notification.alert(message, alertCallback, title, buttonName);
                 function alertCallback() {
                   console.log("Alert is Dismissed!");
                 }
               })
               ;

       }
       $scope.goNotifications= function() {
             $state.go('notification_center');
         }
         $scope.notifications = [];
         $scope.getNotifications= function(count) {
             smartechService.getNotifications(count)
                 .then(function(result) {
                   angular.forEach(JSON.parse(result), function(value, key) {
                       var status = value.status;
                       var deliver_time = value.deliver_time;

                       if(status === "Empty"){
                           $scope.notifications.push({
                               "title": "No Data Found"
                           });
                       }
                       var message = JSON.parse(value.message).data.message;
                       var title = JSON.parse(value.message).data.title;
                       var customPayload = JSON.parse(value.message).data.customPayload;
                       $scope.notifications.push({
                           "status": status,
                           "deliver_time": deliver_time,
                           "message": message,
                           "title": title,
                           "customPayload": customPayload
                       });
                   });
                 })
                 ;
         }

       $scope.exit= function() {
         window.close();
         ionic.Platform.exitApp();
       }
     });
