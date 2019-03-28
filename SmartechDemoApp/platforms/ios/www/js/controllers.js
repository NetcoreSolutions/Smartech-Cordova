angular.module('app.controllers', [])




.controller('indexCtrl', function($scope,sharedCartService) {
	//$scope.total = 10; 
})
   
.controller('loginCtrl', function($scope,$rootScope,$ionicPopup,$state,$ionicHistory) {
	$scope.ids = {
    	identity: "",
      	token: ""
    };
    
    
		$scope.login = function() {
    	var identity = $scope.ids.identity;
      document.addEventListener('onDeepLink', this.onDeepLink, false); // optional, register to receive deep links.
      document.addEventListener('onCustomPayload', this.onCustomPayload, false); // optional, register to receive deep links.  

      Smartech.addObserverForDeeplinkAndCustomPayload();    
		    Smartech.login(identity, function(response){
                console.log(response);
            }, function(error){
                console.log(error);
       });
			$state.go('home', {}, {location: "replace", reload: true});
		}
		$scope.skip = function() {
      Smartech.addObserverForDeeplinkAndCustomPayload();    
      document.addEventListener('onDeepLink', this.onDeepLink, false); // optional, register to receive deep links.
      document.addEventListener('onCustomPayload', this.onCustomPayload, false); // optional, register to receive deep links.  

			$state.go('home', {}, {location: "replace", reload: true});
		}

    $scope.onDeepLink= function(e) {
      console.log(e.deeplink);
      console.log("profile is "+e.deeplink.includes("profile"));
      console.log("custom is "+e.deeplink.includes("custom"));
        if (e.deeplink.includes("home")) {
  //  block of code to be executed if the condition is true
      $state.go('profile', {}, {location: "replace", reload: true});    
      } else  if (e.deeplink.includes("custom")) {
        $state.go('custom', {}, {location: "replace", reload: true});
      }
      
    }
    $scope.onCustomPayload = function(e) {
      console.log("onCustomPayload"+e.onCustomPayload);
    }
})
   



.controller('HomeCtrl', function($scope,$state,$state) {


    $scope.events = {
        eventName: "Custom Payload",
        customPayload: "{\"name\":\"Galaxy\",\"description\":\"20gram bars\",\"id\":\"1\"}"
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
	//onload event
	$scope.track=function(eventName) {
		var eventName = eventName;
        var payload = $scope.payloadata;

        Smartech.track(eventName, payload, function(response){
           console.log(response);
        }, function(error){
          console.log("error: "+reason)
        });
        // Smartech.track(eventName, payload)
        // .then(result => {
         
        // })
        // .catch(reason => console.log("error: "+reason));
	}

	$scope.profileUpdate=function(){
		$state.go('profile', {}, {location: "replace", reload: true});
		
	}

	$scope.optOut=function(flag){
    Smartech.optOut(flag,function(response){
           console.log(response);
    }, function(error){
          console.log("error: "+reason)
    });
  }

	$scope.customData=function(){
		$state.go('custom');
	}

	$scope.otherFunctions=function(){
		$state.go('other', {}, {location: "replace", reload: true});	
	}

	$scope.goNotifications=function(){
		 $state.go('notification_center', {}, {location: "replace", reload: true});	
	}
	
	$scope.getGUID=function(){

    Smartech.getGUID(function(response){
            console.log("services call "+response);
            var message = response;
              var title = "Push GUID";
              var buttonName = "Ok";
              // navigator.notification.alert(message, alertCallback, title, buttonName);
              // function alertCallback() {
              //   console.log("Alert is Dismissed!");
              // }

           }, function(error){
              console.log(error);
          });
}

	 $scope.notifications = [];
      $scope.getNotifications= function(count) {
      	   Smartech.getNotifications(count, function(response){
           var message = response;
                var title = "notification";
                var buttonName = "Ok";
                navigator.notification.alert(message, alertCallback, title, buttonName);
                function alertCallback() {
                  console.log("Alert is Dismissed!");
                  $state.go('home');
                }
           }, function(error){
              console.log(error);
          });   
      }
	$scope.saveCustom = function(){
		 var eventName = $scope.events.eventName;
        var payload =  JSON.parse($scope.events.customPayload);
        Smartech.track(eventName, payload, function(response){
           console.log(response);
        }, function(error){
          console.log("error: "+reason)
        });
	}
	 $scope.setUserLocation= function() {
        var latitude = $scope.location.latitude;
        var longitude = $scope.location.longitude;
        Smartech.setUserLocation(latitude, longitude, function(response){
           console.log(response);
        }, function(error){
          console.log("error: "+reason)
        });

        // Smartech.setUserLocation(latitude, longitude)
        // .then(result => {
        //   console.log(result);
        // })
        // .catch(reason => console.log("error: "+reason));
    }
    $scope.setPushToken= function() {
        var token = $scope.ids.token;

        Smartech.setPushToken(token, function(response){
           console.log(response);
        }, function(error){
          console.log("error: "+reason)
        });

        
    }
    $scope.getPushToken= function() {
      Smartech.getPushToken(function(response){
            console.log("services call "+response);
            var message = response;
              var title = "Push Token";
              var buttonName = "Ok";
              // navigator.notification.alert(message, alertCallback, title, buttonName);
              // function alertCallback() {
              //   console.log("Alert is Dismissed!");
              // }

           }, function(error){
              console.log(error);
          });
    }
	$scope.logout= function() {
       Smartech.logout(function(response){
            console.log("services call "+response);
            $state.go('login');

           }, function(error){
              console.log(error);
          });
       Smartech.clearIdentity(function(response){
            console.log("services call "+response);
            $state.go('login');

           }, function(error){
              console.log(error);
          });
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

        Smartech.profile(profilePayload, function(response){
            console.log("services call "+response);
            var message = "sucess";
              var title = "Profile pushed";
              var buttonName = "Ok";
              navigator.notification.alert(message, alertCallback, title, buttonName);
              function alertCallback() {
                console.log("Alert is Dismissed!");
              }

           }, function(error){
              console.log(error);
          });


  //       Smartech.profile(profilePayload)
  //           .then(result => {
  //             console.log(result);
  //               var message = "Data Save Successfully!";
  //               var title = "Information";
  //               var buttonName = "Ok";
  //               navigator.notification.alert(message, alertCallback, title, buttonName);
  //               function alertCallback() {
	 //    		  console.log("Alert is Dismissed!");
  //                 $state.go('home');
  //               }

  //           })
		// .catch(reason => console.log("error: "+reason));
    }


})
 
