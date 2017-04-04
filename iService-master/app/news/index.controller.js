(function () {
    'use strict';
    angular
        .module('app')
        .controller('news.IndexController', Controller);
    function Controller(UserService, $http, $scope) {
//////////Config IP///////////////
$scope.configIP = "http://161.246.133.7:3000";
// $scope.configIP = "http://localhost:3000";

var urlShowNews = $scope.configIP + "/showNews";
// $http.get(urlShowNews)
$http({
    method : "GET",
     headers: {
   'Content-Type': 'application/json'
              },
    url : urlShowNews
  })
.success( function(data) {
   $scope.dataNews =  data;
});


var urlShowNewsIt = $scope.configIP + "/showNews/it";
// $http.get(urlShowNewsIt)
$http({
    method : "GET",
     headers: {
   'Content-Type': 'application/json'
              },
    url : urlShowNewsIt
  })
.success( function(data) {
   $scope.dataNewsIt =  data;
});
var urlShowNewsLib = $scope.configIP + "/showNews/Lib";
// $http.get(urlShowNewsLib)
$http({
    method : "GET",
     headers: {
   'Content-Type': 'application/json'
              },
    url : urlShowNewsLib
  })
.success( function(data) {
   $scope.dataNewsLib =  data;
});

/////////////////////BUTTON SELECT NEWS///////////////////////
$scope.showNewsAll = function(){
$("#div-news-search").hide("show");
$("#div-news-it").hide("show");
$("#div-news-lib").hide("show");
$("#div-news-all").show("show");
// $("#div-news-all").addClass('active');
}
$scope.showNewsIt = function(){
$("#div-news-search").hide("show");
$("#div-news-all").hide("show");
$("#div-news-lib").hide("show");
$("#div-news-it").show("show");
// $("#div-news-it").addClass('active');
}
$scope.showNewsLib = function(){
$("#div-news-search").hide("show");
$("#div-news-all").hide("show");
$("#div-news-it").hide("show");
$("#div-news-lib").show("show");
// $("#div-news-lib").addClass('active');
}

/////////////BUTTON Search/////////////////////
$scope.SearchNews = [];
$scope.getNews = function(){
var urls = $scope.configIP + "/showNews/" + $scope.Search.title;
// $http.get(urls)
$http({
    method : "GET",
     headers: {
   'Content-Type': 'application/json'
              },
    url : urls
  })
.then( function(response) {
    console.log(response.data);
       if(response.data == null){
        return alert("ไม่พบข่าว "+ $scope.Search.title);
       }else {
            $scope.SearchNews = response.data;
            $(".buttonSearchUpdate").show("show");
            $("#div-news-it").hide("show");
            $("#div-news-lib").hide("show");
            $("#div-news-all").hide("show");
            $("#div-news-search").show("show");
       }
})
}

/////////////Delete News///////////////////
$scope.ButtonDeleteNews= function(Newss){
$scope.GetNewsDelete =  Newss.title;
console.log($scope.GetNewsDelete);
var buttonConfirmDeleteNews = confirm("ต้องการลบข่าว " + $scope.GetNewsDelete + "หรือไม่");
    if (buttonConfirmDeleteNews == true) {
        alert('ลบ User : ' + $scope.GetNewsDelete + 'เสร็จสำบูรณ์');
        var urlDelete = $scope.configIP + "/News/delete/" + $scope.GetNewsDelete;
        console.log($scope.GetNewsDelete);
$http({
    method : "DELETE",
     headers: {
   'Content-Type': 'application/json'
              },
    url : urlDelete
  })
.success(function() {
    console.log('success is called');
  });

    } else {
        console.log('Cancel Delete');
    }
}



    }
})();
