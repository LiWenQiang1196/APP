angular.module("app").controller("dengluCtrl",["$scope","$state",function($scope,$state){
	$scope.next=function(){
		localStorage.setItem("userid",1)
		$state.go("mine1")
	}
}])