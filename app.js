// MODULE
var rssApp = angular.module('rssApp', ['ngRoute', 'ngResource']);

// ROUTES
rssApp.config(function ($routeProvider){

    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html',
    }) 
});                  
// CONTROLLERS
rssApp.controller('homeController', ['$scope','$http', function($scope,$http){
  $scope.enteries=[];
  $scope.getItem = function(){
    var url = 'http://rss.cnn.com/rss/edition.rss'
  feednami.load(url,function(result){
    if(result.error){
      console.log(result.error)
    }
    else{
      $scope.entries = result.feed.entries;
       $scope.$apply(function () {
           console.log($scope.entries);
        });
      for(var i = 0; i < $scope.entries.length; i++){
        var entry = $scope.entries[i]
        console.log(entry.title);
      }
    }
  })
};
$scope.getItem();

}]);




