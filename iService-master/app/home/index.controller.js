(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);


    function Controller($window, UserService, FlashService, $scope, $http, $state) {

        var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;

        initController();
///////////////Config IP////////////////
$scope.configIP = "http://161.246.133.7:3000";


$scope.RefreshOnline = function(){
    // $window.location.reload();
    var urlCheck1 = $scope.configIP + "/checkrole";
// $http.get(urlCheck1)
$http({
    method : "GET",
     headers: {
   'Content-Type': 'application/json'
              },
    url : urlCheck1
  })
.then( function(response) {
          $scope.usersOnline = response.data;
          console.log($scope.usersOnline);
});
}
///////////Check Online/////////
// http://localhost:3000/checkrole
var urlCheck = $scope.configIP + "/checkrole";
$http.get(urlCheck).then( function(response) {
          $scope.usersOnline = response.data;
});

$scope.ButtonAdd = function(){
$("#div-table").hide("show");
$("#div-editAdd").show("show");
}
$scope.cancelAdd = function(){
$("#div-table").show("show");
$("#div-editAdd").hide("show");
}

$scope.calcelGetUser = function(){
$("#div-editSearch").hide("show");
$("#div-getUserBox").hide("show");
$("#div-table").show("show");
}


/////////////BUTTON Search/////////////////////
$scope.GetDataUser = [];
$scope.getUser = function(){
var urls = $scope.configIP + "/g/" + $scope.Search.username;
// $http.get(urls)
$http({
    method : "GET",
     headers: {
   'Content-Type': 'application/json'
              },
    url : urls
  })
.then( function(response) {
       // alert("ไม่พบ User : " + $scope.Search.username);
          $scope.GetDataUser = response.data;
          $(".buttonSearchUpdate").show("show");

}).catch(function(data, status) {
    console.error('Gists error', response.status, response.data);
    return alert("ไม่พบ User : " + $scope.Search.username);
  });
}
/////////////buttonDeleteSearch///////////////////
$scope.ButtonDeleteSearch= function(){
var buttonConfirmSearchDelete = confirm("Press a button!");
    if (buttonConfirmSearchDelete == true) {
        alert('ลบ User : '+ $scope.GetDataUser.username +'เสร็จสำบูรณ์');
        $("#backHome").show("show");
        
        var urlDelete = $scope.configIP + "/g/delete/" + $scope.GetDataUser.username;
        $window.location.reload();
        // $http.delete(urlDelete, {username:$scope.GetDataUser.username})
            
$http({
    method : "DELETE",
     headers: {
   'Content-Type': 'application/json'
              },
    url : urlDelete,
        data: {
   'username':$scope.GetDataUser.username
                },
  })
.success(function() {
    console.log('success is called');
  });
    } else {
        console.log('Cancel Delete');
    }
}
////////////////////////Button Add Users///////////////////////
$scope.addData = function(){
var urlAddUserIonic = $scope.configIP + "/postUsers";
$http({
    method : "POST",
     headers: {
   'Content-Disposition': 'form-data'
              },
    url : urlAddUserIonic,
        data: {
   'username':$scope.username, 'password':$scope.password,
    'firstname':$scope.firstname, 'lastname':$scope.lastname,
    'faculty':$scope.faculty, 'year':$scope.year,
    'userType':$scope.userType
                },
  })
.success( function(response) {
  console.log('OK');
  $window.location.reload();
  // console.log($scope.username);
  alert('เพิ่มข้อมูลของ User' +  $scope.username + 'สำเร็จ' );
    $("#div-table").show("show");
    $("#div-editAdd").hide("show");

});

}

////////////////////////////Get Users////////////////
// ButtonUpdateGetUser(GetDataUser)
$scope.ButtonUpdateGetUser = function(){
$("#div-table").hide("show");
$("#div-editSearch").show("show");
$("#backHome").show("show");
}

////////////////////////////Button Save Update Search//////////////////
$scope.saveSearch = function(){

var urlUpdate = $scope.configIP + "/g/update/" + $scope.GetDataUser.username;

$http({
    method : "POST",
     headers: {
   'Content-Disposition': 'form-data'
 },
    url : urlUpdate,
        data: {
    'firstname':$scope.GetDataUser.firstname, 'lastname':$scope.GetDataUser.lastname,
    'faculty':$scope.GetDataUser.faculty, 'year':$scope.GetDataUser.year,
    'userType':$scope.GetDataUser.userType
},
  })
.success( function(response) {
});
alert("แก้ไข้ข้อมูลของ User "+ $scope.GetDataUser.username + "สำเร็จ");
$window.location.reload();
// $state.go('home');
};




//////////////// Update USers /////////////
$scope.ButtonUpdateUser = function(test){
// $scope.IndexData = {};
$scope.IndexData = $scope.ShowUsersIonic.indexOf(test);
console.log("Index "+ $scope.IndexData);
console.log(test.username);
 console.log(test);
$scope.buttonUpdateUser = [];
$scope.buttonUpdateUser.username = test.username;
$scope.buttonUpdateUser.firstname = test.firstname;
$scope.buttonUpdateUser.lastname = test.lastname;
console.log($scope.buttonUpdateUser.firstname);
$scope.buttonUpdateUser.faculty = test.faculty;
$scope.buttonUpdateUser.year = test.year;
$scope.buttonUpdateUser.userType = test.userType;
$("#div-table").hide("show");
$("#div-editbox").show("show");
};


/////////////////BUTTON DELETE /////////////////////////////
$scope.buttonDeleteUser = [];
$scope.ButtonDeleteUser = function(test){
$scope.IndexDataDelete = $scope.ShowUsersIonic.indexOf(test);
console.log($scope.IndexDataDelete);
console.log(test.username);
$scope.buttonDeleteUser.username = test.username;
console.log($scope.buttonDeleteUser.username)
var buttonConfirmDelete = confirm("Press a button!");
    if (buttonConfirmDelete == true) {
        alert('ลบ User : '+ $scope.buttonDeleteUser.username +'เสร็จสำบูรณ์');
        var urlDelete = $scope.configIP + "/g/delete/" + $scope.buttonDeleteUser.username;
        $window.location.reload();
        // $http.delete(urlDelete, {username:$scope.buttonDeleteUser.username})
            


$http({
    method : "DELETE",
     headers: {
   'Content-Type': 'application/json'
              },
    url : urlDelete,
        data: {
   'username' : $scope.buttonDeleteUser.username
                },
  })
.success(function() {
    console.log('success is called');
  });
    } else {
        console.log('Cancel Delete');
    }
}


$scope.cancelData = function(){

    $("#div-table").show("show");
$("#div-editbox").hide("show");
}

$scope.saveData = function(){

var urlUpdate = $scope.configIP + "/g/update/" + $scope.buttonUpdateUser.username;

$http({
    method : "POST",
     headers: {
   'Content-Disposition': 'form-data'
 },
    url : urlUpdate,
        data: {
    'firstname':$scope.buttonUpdateUser.firstname, 'lastname':$scope.buttonUpdateUser.lastname,
    'faculty':$scope.buttonUpdateUser.faculty, 'year':$scope.buttonUpdateUser.year,
    'userType':$scope.buttonUpdateUser.userType
},
  })
.success( function(response) {

    alert("Success");
    console.log('OK');
    $("#div-table").show("show");
    $("#div-editbox").hide("show");
  // $state.go('home');
});
    alert("Success");
    console.log('OK');
    $("#div-table").show("show");
    $("#div-editbox").hide("show");
};
//     $("#div-table").show("show");
// $("#div-editbox").hide("show");


var urlShowJson = $scope.configIP + "/all/users";
$http.get(urlShowJson).success( function(data) {
   $scope.ShowUsersIonic =  data;
});



        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                // $scope.User = vm.user;
                // console.log($scope.User);
            });
        }

        function saveUser() {
            UserService.Update(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();