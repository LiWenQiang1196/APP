angular.module("app").controller("workCtrl",["$http","$scope","work_content_service",function($http,$scope,work_content_service){
	work_content_service.all().then(function(data){
		$scope.list=data
	})
}])