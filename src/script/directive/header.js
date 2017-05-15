angular.module("app").directive("yuHeader",[function(){
	return{
		restrict:"E",
		templateUrl:"view/template/header.html",
		scope:{
			title:"@",
			isShow:"=",
			fade:"="
		},
		controller:["$scope",function($scope){
			$scope.back=function(){

					if($scope.fade){
						$scope.isShow=false;
					} else{
					window.history.back();
				}
			}
		}]
	}
}])