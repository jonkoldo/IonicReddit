(function(){
  var app = angular.module('starter', ['ionic', 'angularMoment']);

  app.controller("RedditCtrl", function($scope, $http){
    $scope.posts=[];
    $http.get("https://www.reddit.com/r/gaming/new/.json")
      .success(function(posts){
          angular.forEach(posts.data.children, function(post){
              $scope.posts.push(post.data);
          });
      }); 
    $scope.cargarAntiguosPosts=function(){
        var parametros = [];
        if ($scope.posts.length > 0) parametros['after']=$scope.posts[$scope.posts.length-1].name;
        $http.get("https://www.reddit.com/r/gaming/new/.json", {params:parametros})
          .success(function(posts){
            angular.forEach(posts.data.children, function(post){
                $scope.posts.push(post.data);
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });

    }
    $scope.cargarNuevosPosts=function(){
        if ($scope.posts.length > 0) { var parametros={'before':$scope.posts[0].name} };
        if ($scope.posts.length === 0) {return;}
        $http.get("https://www.reddit.com/r/gaming/new/.json", {params:parametros})
          .success(function(posts){
            var nuevosPosts=[];
            angular.forEach(posts.data.children, function(post){
                nuevosPosts.push(post.data);
            });
            $scope.posts=nuevosPosts.concat($scope.posts);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });

    }
    $scope.openLink=function(url){
      window.open(url, "_blank");
    }
  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
    
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.cordova && window.cordova.InAppBrowser){
        window.open=window.cordova.InAppBrowser.open;
      } 
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
}());
