(function () {
    'use strict';
    angular
        .module('app')
        .controller('IndexTwoController', Controller);
    function Controller($scope, $http, $window, UserService, FlashService, $state) {
/////////////////Config IP//////////////////////
$scope.configIP = "http://161.246.133.7:3000";
// http://localhost:3000
        var vm = this;
        vm.user = null;
        initController();
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                $scope.author = vm.user.username;
            });
        };
var ed=tinymce.get('content');
$scope.testData = function(){
    alert(ed.getContent());
};
// $scope.filename = {};
// $scope.setFile = function(element) {
//         $scope.$apply(function($scope) {
//             $scope.theFile = element.files[0];
//            $scope.filename =  $scope.theFile.name
//         });
//     };
$scope.addData = function(){
var urlPostNews = $scope.configIP + "/postNews3";
  $http({
    method : "POST",
     headers: {
   'Content-Disposition': 'form-data'
 },
    url : urlPostNews,
        data: {
    'topic':$scope.topic, 'title':$scope.title,
    'group_id':$scope.group_id, 'author':$scope.author,
    'faculty':$scope.faculty, 'year':$scope.year,
    'userType':$scope.userType ,'description':ed.getContent(),
    'image': $scope.image ,
    // 'image': "http://localhost:3000/postNews/" + $scope.filename 
},
  }).then(function mySucces(response) {
    // alert("เขียนข่าว" + $scope.title + "เสร็จสมบรูณ์");
    }, function myError(response) {
  });

  alert("เขียนข่าว" + $scope.title + "เสร็จสมบรูณ์");
  $window.location.href = '/';
// $state.go('news');
 // $state.go('news');
};





}

}

)();