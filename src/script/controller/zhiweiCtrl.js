angular.module("app").controller("zhiweiCtrl",["xiangqing_content_service","$scope","$state",function(xiangqing_content_service,$scope,$state){
	var id=$state.params.id
	console.log(id)
	xiangqing_content_service.oneId(id).then(function(data){
		$scope.data=data
		console.log($scope.data)
		$scope.index=0;
		$scope.change=function(index){
			$scope.index=index;
			$scope.ll=$scope.data.positionClass[index].positionList;
			
		}
		$scope.change(0)
	})
}])