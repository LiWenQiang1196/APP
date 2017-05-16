angular.module("app").controller("mine1Ctrl",["$scope","$state",function($scope,$state){
	$scope.removuserid=function(){
		localStorage.removeItem("userid")
		$state.go("mine")
	}
}])