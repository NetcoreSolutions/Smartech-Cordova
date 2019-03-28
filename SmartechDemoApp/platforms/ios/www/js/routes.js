angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    .state('login', {
      url: '/page1',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
    .state('home', {
      url: '/page2',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })
        
    .state('custom', {
      url: '/page3',
      templateUrl: 'templates/custom.html',
      controller: 'HomeCtrl'
    })
	
	  .state('other', {
      url: '/page5',
      templateUrl: 'templates/other.html',
      controller: 'HomeCtrl'
    })
    
    .state('filterBy', {
      url: '/page6',
      templateUrl: 'templates/filterBy.html',
      controller: 'filterByCtrl'
    })
        
    .state('sortBy', {
      url: '/page7',
      templateUrl: 'templates/sortBy.html',
      controller: 'sortByCtrl'
    })
        
    .state('payment', {
      url: '/page8',
      templateUrl: 'templates/payment.html',
      controller: 'paymentCtrl'
    })
        
    .state('profile', {
      url: '/page9',
      templateUrl: 'templates/profile.html',
      controller: 'HomeCtrl'  
    })
        
    .state('myOrders', {
      url: '/page10',
      templateUrl: 'templates/myOrders.html',
      controller: 'myOrdersCtrl'
    })
        
    .state('editProfile', {
      url: '/page11',
      templateUrl: 'templates/editProfile.html',
      controller: 'editProfileCtrl'
    })
        
    .state('favorates', {
      url: '/page12',
      templateUrl: 'templates/favorates.html',
      controller: 'favoratesCtrl'
    })
        
    .state('productPage', {
      url: '/page13',
      templateUrl: 'templates/productPage.html',
      controller: 'productPageCtrl'
    })

    .state('notification_center', {
      url: '/page13',
      templateUrl: 'templates/notification_center.html',
      controller: 'HomeCtrl'
    })
    
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page1');

});