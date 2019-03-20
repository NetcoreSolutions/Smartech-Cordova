angular.module('cordova_smartech.utils.services', ['angular-es6-promises'])

.service("smartechService",function(Promise) {
this.setIdentity= function(identity) {
                  return new Promise(function(resolve, reject) {
                      try{
                          Smartech.setIdentity(identity, function(response){
                          console.log("Response: "+response);
                          resolve(response); }, function(error){
                              console.log(error);
                              reject(error); });
                      }
                      catch (e) {
                          console.log(e);
                          reject(e);
                        //throw e;
                      }
                  });
              }
this.clearIdentity= function(){
                  return new Promise(function(resolve, reject) {
                      try{
                          Smartech.clearIdentity( function(response){
                          console.log("services call "+response);
                          resolve(response); }, function(error){
                              console.log(error);
                              reject(error); });
                      }
                      catch (e) {
                          console.log(e);
                          reject(e);
                        //throw e;
                      }
                  });
              }
this.login= function(identity){
                  return new Promise(function(resolve, reject) {
                      try{
                          Smartech.login(identity, function(response){
                          console.log("Response: "+response);
                          resolve(response); }, function(error){
                              console.log(error);
                              reject(error); });
                      }
                      catch (e) {
                          console.log(e);
                          reject(e);
                        //throw e;
                      }
                  });
              }
this.logout= function(){
                  return new Promise(function(resolve, reject) {
                      try{
                          Smartech.logout(function(response){
                              console.log("services call "+response);
                              Smartech.clearIdentity();
                              resolve(response);
                          }, function(error){
                              console.log(error);
                              reject(error); });
                      }
                      catch (e) {
                          console.log(e);
                          reject(e);
                        //throw e;
                      }
                  });
              }
this.track= function(eventName, payload) {
                 return new Promise(function(resolve, reject) {
                      try{
                          Smartech.track(eventName, payload, function(response){
                          console.log("services call "+response);
                          resolve(response); }, function(error){
                              console.log(error);
                              reject(error); });
                      }
                      catch (e) {
                          console.log(e);
                          reject(e);
                        //throw e;
                      }
                  });
              }
this.profile= function(profileDetails) {
                  return new Promise(function(resolve, reject){
                      try{
                          Smartech.profile(profileDetails, function(response){
                          console.log("services call "+response);
                          resolve(response); }, function(error){
                              console.log(error);
                              reject(error); });
                      }
                      catch (e) {
                          console.log(e);
                          reject(e);
                        //throw e;
                      }
                  });
              }
this.optOut= function(flag) {
                  return new Promise(function(resolve, reject) {
                      try{
                          Smartech.optOut(flag, function(response){
                          console.log("services call "+response);
                          resolve(response); }, function(error){
                              console.log(error);
                              reject(error); });
                      }
                      catch (e) {
                          console.log(e);
                          reject(e);
                        //throw e;
                      }
                  });
              }
this.setUserLocation= function(latitude, longitude){
                  return new Promise(function(resolve, reject){
                      try{
                          Smartech.setUserLocation(latitude, longitude, function(response){
                          console.log("services call "+response);
                          resolve(response); }, function(error){
                              console.log(error);
                              reject(error); });
                      }
                      catch (e) {
                          console.log(e);
                          reject(e);
                        //throw e;
                      }
                  });
              }
this.getGUID= function() {
                  return new Promise(function(resolve, reject) {
                      try{
                          Smartech.getGUID( function(response){
                          console.log("services call "+response);
                          resolve(response); }, function(error){
                              console.log(error);
                              reject(error); });
                      }
                      catch (e) {
                          console.log(e);
                          reject(e);
                        //throw e;
                      }
                  });
              }
this.getNotifications= function(notificationCount) {
                   return new Promise(function(resolve, reject){
                      try{
                          Smartech.getNotifications(notificationCount, function(response){
                          var data = JSON.stringify(response);
                          console.log("services call "+data);
                          resolve(response); }, function(error){
                              console.log(error);
                              reject(error); });
                      }
                      catch (e) {
                          console.log(e);
                          reject(e);
                        //throw e;
                      }
                  });
              }
this.setPushToken= function(token){
                  return new Promise(function(resolve, reject){
                      try{
                          Smartech.setPushToken(token, function(response){
                          console.log("services call "+response);
                          resolve(response); }, function(error){
                              console.log(error);
                              reject(error); });
                      }
                      catch (e) {
                          console.log(e);
                          reject(e);
                        //throw e;
                      }
                  });
              }
this.getPushToken= function(){
                  return new Promise(function(resolve, reject) {
                      try{
                          Smartech.getPushToken(function(response){
                          console.log("services call "+response);
                          resolve(response); }, function(error){
                              console.log(error);
                              reject(error); });
                      }
                      catch (e) {
                          console.log(e);
                          reject(e);
                        //throw e;
                      }
                  });
              }
});
