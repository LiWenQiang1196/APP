angular.module("app").directive("yuFooter",[function(){
	return{
		restrict:"E",
		templateUrl:"view/template/footer.html",
		replacet:true,
		controller:["$scope",function($scope){
		$scope.uzi=localStorage.getItem("userid")
		console.log($scope.uzi)
	}]
		
	}
	
	
}])