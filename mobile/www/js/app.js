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

  var feed1val;
  var feed2val;

  var grandpa = './img/grandpa.jpg';
  var grandma = './img/grandma.jpg';

  var count = 0;

  $interval(function() {

    // feed - id=1
    $http({
      method: 'GET',
      url: 'http://45.33.109.130:8080/webserv/get?userId=1&fileName=e5'
    }).then(function successCallback(response) {
      //console.log(response.data);
      
      if (feed1val != response.data[0].eventValue) {
        angular.element(document.getElementById('feed')).prepend('<div class="item item-avatar"><img src="' + grandpa + '"><h2>Grandpa</h2><p>is ' + getContext(response.data[0].eventType) + ' ' + response.data[0].eventType + '</p><span class="badge badge-balanced" id="time' + count++ + '">0 secs ago</span></div>');
        feed1val = response.data[0].eventValue;
      }
    });

    // feed - id=2
    $http({
      method: 'GET',
      url: 'http://45.33.109.130:8080/webserv/get?userId=2&fileName=e5'
    }).then(function successCallback(response) {
      //console.log(response.data);

      if (feed2val != response.data[0].eventValue) {
        angular.element(document.getElementById('feed')).prepend('<div class="item item-avatar"><img src="' + grandma + '"><h2>Grandma</h2><p>is ' + getContext(response.data[0].eventType) + ' ' + response.data[0].eventType + '</p><span class="badge badge-balanced" id="time' + count++ + '">0 secs ago</span></div>');
        feed2val = response.data[0].eventValue;
      }
    });

    // activity - id=1
    $http({
      method: 'GET',
      url: 'http://45.33.109.130:8080/webserv/get?userId=1&fileName=d1'
    }).then(function successCallback(response) {
      //console.log(response.data);
      if (response.data[0].eventValue == "true")
        angular.element(document.getElementById('activity-one')).html('Active Now');
      else if (response.data[0].eventValue == "false")
        angular.element(document.getElementById('activity-one')).html('Idle');
    });

    // activity - id=2
    $http({
      method: 'GET',
      url: 'http://45.33.109.130:8080/webserv/get?userId=2&fileName=d1'
    }).then(function successCallback(response) {
      //console.log(response.data);
      if (response.data[0].eventValue == "true")
        angular.element(document.getElementById('activity-two')).html('Active Now');
      else if (response.data[0].eventValue == "false")
        angular.element(document.getElementById('activity-two')).html('Idle');
      else
        angular.element(document.getElementById('activity-two')).html('Not connected');
    });

    for (i = 0; i < count; i++) {
      var idName = 'time' + i;
      var cur = angular.element(document.getElementById(idName)).html();
      var index = cur.indexOf(" ");
      var sec = parseInt(cur.substring(0,index), 10);
      var newTime = sec + 1;
      angular.element(document.getElementById(idName)).html(newTime + ' secs ago');
    }
  }, 1000);

  function getContext(action) {
    switch (action) {
      case 'HELP':
        return 'in need of';
      case 'Breakfast':
      case 'Lunch':
      case 'Dinner': 
        return 'having';
      case 'Groceries':
        return 'buying';
      case 'Medicine':
        return 'taking';
      case 'Exercise':
        return 'doing';
      case 'Nap':
        return 'taking a';
    }
  }

  return null;
}]);