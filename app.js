// MODULE
var rssApp = angular.module('rssApp', ['ngRoute', 'ngResource','angularMoment','infinite-scroll']);

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

  $scope.loadMore = function(){
  var url = 'http://rss.cnn.com/rss/edition.rss'
  feednami.load(url,function(result){
    if(result.error){
      console.log(result.error)
      if(window.localStorage["entries"] !== undefined){
        $scope.entries = JSON.parse(window.localStorage["entries"]);
      }
    }
    else{
      $scope.entries = result.feed.entries;
      window.localStorage["entries"] = JSON.stringify(result.feed.entries);
       $scope.$apply(function () {
        // $scope.entries = _.sortBy($scope.entries, function(el) { return el.pubdate; });
           console.log($scope.entries);
        });
      // // for(var i = 0; i < $scope.entries.length; i++){
      // //   var entry = $scope.entries[i]
      // //   console.log(entry.title);
      // //    console.log(entry.summary) 
      // }
    }
  })
};
$scope.loadMore();

}]);




