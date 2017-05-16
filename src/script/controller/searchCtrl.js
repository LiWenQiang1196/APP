angular.module("app").controller("searchCtrl",["$filter","work_content_service","keywords_service","cityList_service","$scope",function($filter,work_content_service,keywords_service,cityList_service,$scope){
	cityList_service.all().then(function(data){
		$scope.data=data
	})
	$scope.keywordslist=keywords_service.get("keywords")
	
	
	$scope.qshow=function(){
		$scope.isShow=true;
	}
	
	
	$scope.$on("cityid",function(event,num){
		cityList_service.oneId(num).then(function(data){
			$scope.cc=data.name;
			$scope.search();
			
		})
	})
	
	$scope.search=function(){
		if(!$scope.keywords){
			return
		}
		$scope.trfl=true;
		var keywords=keywords_service.get("keywords")
		keywords.unshift($scope.keywords)
		console.log($scope.keywords)
		keywords_service.set("keywords",keywords)
		
		work_content_service.all().then(function(data){
			var options={city:$scope.cc,keywords:$scope.keywords}
			var jobs=$filter("jobfilter")(data,options)
			
			if(jobs.length==0){
				$scope.joblist=[];
			}else{
				$scope.joblist=jobs
			}
		})
		
		
	}
	
	$scope.$on("removekeywords",function(event,num){
		$scope.keywordslist.splice(num,1)
		keywords_service.set("keywords",$scope.keywordslist)
	})
	
	//快速查询
	$scope.$on("odsearch",function(event,keywords){
		$scope.keywords=keywords
		$scope.search()
	})
	
	
	
	
}])