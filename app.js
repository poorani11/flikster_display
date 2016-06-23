// MODULE
var rssApp = angular.module('rssApp', ['ngRoute', 'ngResource','angularMoment','infinite-scroll','lodash']);

// ROUTES
rssApp.config(function ($routeProvider){

  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.html',
  }) 
});                  
// CONTROLLERS
rssApp.controller('homeController', ['$scope','$http','_', function($scope,$http,_){
  $scope.entries=[];
  $scope.newEntry = [];
  length=25;

  $scope.getItem = function(){
    var url = 'http://www.thehindu.com/?service=rss'
    feednami.load(url,function(result){
      if(result.error){
        console.log(result.error)
        if(window.localStorage["entries"] !== undefined){
          $scope.entries = JSON.parse(window.localStorage["entries"]);
        }
      } else {
        $scope.entries = result.feed.entries;
        _.sortBy($scope.entries, function(o) { return o.pubdate; });
        for(var i = 0; i < length; i++){
          var entry = $scope.entries[i]
          $scope.newEntry.push(entry);
        }
        $scope.$apply(function () {
        $scope.newEntry = $scope.newEntry;
      });
      }
    })
  };

  $scope.getItem();

  $scope.myPagingFunction=function(){
    var length = $scope.newEntry.length - 1;

    if($scope.entries.length > length){
      for(var i = 1; i <= 25; i++) {
        $scope.newEntry.push($scope.entries[length + i]);
      }
    }
  }


}]);




