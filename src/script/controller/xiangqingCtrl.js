angular.module("app").controller("xiangqingCtrl",["xiangqing_content_service","work_content_service","$scope","$state",function(xiangqing_content_service,work_content_service,$scope,$state){
	var id=$state.params.id
	work_content_service.oneId(id).then(function(data){
		$scope.dtaa=data;
		companyId=data.companyId;
	xiangqing_content_service.oneId(companyId).then(function(data){
			$scope.com=data
		})
	})
}])