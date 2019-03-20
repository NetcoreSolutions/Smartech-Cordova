angular.module('cordova_smartech', ['ionic','cordova_smartech.utils.controller' , 'cordova_smartech.utils.services', 'ionic.native','ngCordova'])

.run(function($ionicPlatform, $cordovaDeeplinks, $timeout, $state, $cordovaToast) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        $cordovaDeeplinks.route({
            '/login': {
                target: 'login',
                parent: 'login'
            },
            '/home': {
                target: 'home',
                parent: 'home'
            },
            '/profile': {
                target: 'profile',
                parent: 'profile'
            },
            '/custom': {
                target: 'custom',
                parent: 'custom'
            }
        }).subscribe(function(match) {
            console.dir(match);
            $timeout(function() {
                $state.go(match.$route.parent, match.$args);
                console.log('matching'+JSON.stringify(JSON.parse(match.$link.extra)));
                $cordovaToast.show(JSON.stringify(match.$link.extra), 'long', 'bottom').then(function(success) {
                                    console.log("The toast was shown");
                                }, function (error) {
                                    console.log("The toast was not shown due to " + error);
                                });
                if (match.$route.target != match.$route.parent) {
                    $timeout(function() {
                        $state.go(match.$route.target, {customPayload: JSON.stringify(match.$link.extra)});
                    }, 800);
                }
            }, 100); // Timeouts can be tweaked to customize the feel of the deeplink
        }, function(nomatch) {
            console.warn('No match', nomatch);
            console.dir(nomatch);
        });
    });
})

.config(function($stateProvider, $urlRouterProvider) {
$stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'MainCtrl',
      params: {customPayload: null}
    })
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'MainCtrl',
      params: {customPayload: null}
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/profile.html',
      controller: 'MainCtrl',
      params: {customPayload: "no data"}
    })
    .state('custom', {
      url: '/custom',
      templateUrl: 'templates/custom.html',
      controller: 'MainCtrl'
    })
    .state('other', {
      url: '/other',
      templateUrl: 'templates/other.html',
      controller: 'MainCtrl',
      params: {customPayload: "no data"}
    })
    .state('notification_center', {
      url: '/notification_center',
      templateUrl: 'templates/notification_center.html',
      controller: 'MainCtrl',
      params: {customPayload: "no data"}
    })
    ;
       // if none of the above states are matched, use this as the fallback
       $urlRouterProvider.otherwise('/login');
   });
