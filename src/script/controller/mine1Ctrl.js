angular.module("app").controller("mine1Ctrl",["$scope","$state",function($scope,$state){
	$scope.removuserid=function(){
		console.log(123)
		localStorage.removeItem("userid")
		$state.go("mine")
	}
}])