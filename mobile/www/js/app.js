// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('grandwatch', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('FeedCtrl', ['$scope', 'feed', function($scope) {

  var EventType = {
    BREAKFAST: 0,
    LUNCH: 1,
    DINNER: 2,
    GROCERIES: 3,
    MEDICATION: 4,
    NAP: 5,
    HELP: 6,
    NONE: -99
  };

  //toolkit
  function NetworkingOperations(){}

  NetworkingOperations.prototype.sendMessage = function (){
    //todo send data
  }

  NetworkingOperations.prototype.getMessage = function (person, eventCount){
    var url = 'http://personatestuser.org/email';
    $.getJSON(url, function(data) {
      console.log(data);
    })

    //todo get data from the server
  }
//**************EVENT CLASS BEGIN**************//

  //constructor
  function Event(inputType, inputValue, inputTimeStamp){
    this.eventType = inputType;
    this.eventValue = inputValue;
    this.timeStamp = inputTimeStamp;
  }
//**************EVENT CLASS END**************//

//**************USER ACCOUNT CLASS BEGIN**************//

  //constructor
  function UserAccount(inputUsername){

    this.username = inputUsername;
  }

  UserAccount.prototype.watchList = [];
  UserAccount.prototype.watchListCount = 0;

  //functions
  UserAccount.prototype.getWatchList = function(){
    return this.watchList;
  };

  UserAccount.prototype.addPersonToWatch = function(inputPerson){
    this.watchList.push(inputPerson);
    this.watchListCount++;
  };

  UserAccount.prototype.setUsername = function(inputName){
    this.userName = inputName;
  };

  UserAccount.prototype.getUsername = function(){
    return userName;
  };
//**************USER ACCOUNT CLASS END**************//

//**************PERSON CLASS BEGIN**************//

  //constructor
  function Person(inputId){
    this.uniqueIdentifier = inputId;
  }
  Person.prototype.eventLog = [];
  Person.prototype.eventCount = 0;

  //functions
  Person.prototype.setUniqueIdentifier = function(inputId){
    this.uniqueIdentifier = inputId;
  };

  Person.prototype.addEvent = function(inputEvent){
    this.eventLog.push(inputEvent);
    this.eventCount++;
  };

  Person.prototype.getUniqueIdentifier = function(){
    return uniqueIdentifier;
  };

  Person.prototype.getEventLog = function(){
    return eventLog;
  };

  Person.prototype.getEventCount = function(){
    return eventCount;
  };
//**************PERSON CLASS END**************//
   
}])

.factory('feed', ['$interval', '$http', function($interval, $http) {
  var count = 0;

  $interval(function() {
    var url = 'http://echo.jsontest.com/one/two';

    $http({
      method: 'GET',
      url: url
    }).then(function successCallback(response) {
      console.log(response.data.one);
      count++;
      angular.element(document.getElementById('feed')).prepend('<div class="item item-avatar"><img src="./img/cat.jpg"><h2>Grandpa</h2><p>is having breakfast</p><span class="badge badge-balanced">' + count + ' min ago</span></div>');
    });
  }, 500);

  return null;
}]);