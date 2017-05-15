angular.module("app",["ui.router","validation","validation.rule"])
angular.module("app").controller("mineCtrl",["$scope",function($scope){
	
}])
angular.module("app").controller("searchCtrl",["$filter","work_content_service","keywords_service","cityList_service","$scope",function($filter,work_content_service,keywords_service,cityList_service,$scope){
	cityList_service.all().then(function(data){
		$scope.data=data
	})
	$scope.keywordslist=keywords_service.get("keywords")
	console.log($scope.keywordslist)
	
	
	
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
			console.log($scope.cc,15644)
			var jobs=$filter("jobfilter")(data,options)
			
			if(jobs.length==0){
				$scope.joblist=[];
			}else{
				$scope.joblist=jobs
			}
		})
		
		
	}
	
	$scope.$on("removekeywords",function(event,num){
		console.log(num,"fff")
		$scope.keywordslist.splice(num,1)
		keywords_service.set("keywords",$scope.keywordslist)
	})
	
	//快速查询
	$scope.$on("odsearch",function(event,keywords){
		console.log(keywords,14141)
		$scope.keywords=keywords
		$scope.search()
	})
	
	
	
	
}])
angular.module("app").controller("workCtrl",["$http","$scope","work_content_service",function($http,$scope,work_content_service){
	work_content_service.all().then(function(data){
		$scope.list=data
	})
}])
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
angular.module("app").config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
	$stateProvider.state("work",{
		url:"/work",
		templateUrl:"view/work.html",
		controller:"workCtrl"
	})
	$stateProvider.state("search",{
		url:"/search",
		templateUrl:"view/search.html",
		controller:"searchCtrl"
	})
	$stateProvider.state("mine",{
		url:"/mine",
		templateUrl:"view/mine.html",
		controller:"mineCtrl"
	})
	$stateProvider.state("xiangqing",{
		url:"/xiangqing/:id",
		templateUrl:"view/xiangqing.html",
		controller:"xiangqingCtrl"
	})
	$stateProvider.state("zhiwei",{
		url:"/zhiwei/:id",
		templateUrl:"view/zhiwei.html",
		controller:"zhiweiCtrl"
	})
	
	$urlRouterProvider.otherwise("work")
}]) 
angular.module("app").directive("cityList",[function(){
	return{
		restrict:"E",
		templateUrl:"view/template/cityList.html",
		replace:true,
		scope:{
			isShow:"=",
			data:"="
		},
		controller:["$scope",function($scope){
			$scope.changecity=function(num){
				$scope.$emit("cityid",num)
				$scope.isShow=false
			}
		}]
	}
}])
angular.module("app").directive("yuCompany",[function(){
	return{
		restrict:"E",
		templateUrl:"view/template/company.html",
		replace:true,
		scope:{
			data:"="
		}
	}
}])
angular.module("app").directive("yuContent",[function(){
	return{
		restrict:"E",
		templateUrl:"view/template/work_content.html",
		replace:true,
		scope:{
			data:"="
		}
	}
}])
angular.module("app").directive("yuFooter",[function(){
	return{
		restrict:"E",
		templateUrl:"view/template/footer.html"
	}
}])
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
angular.module("app").directive("kws",[function(){
	return{
		restrict:"E",
		templateUrl:"view/template/kws.html",
		replace:true,
		scope:{
			data:"="
		},
		controller:["$scope",function($scope){
			$scope.removekeywords=function(num){
				console.log(num)
				$scope.$emit("removekeywords",num)
			}
			$scope.odsearch=function(keywords){
				$scope.$emit("odsearch",keywords)
			}
		}]
		
	}
}])
angular.module("app").filter("jobfilter",function(){
	return function(data,options){
		var result=[]
		for (var i=0;i<data.length;i++) {
			var item=data[i]
			var flag=new
			RegExp(options.keywords).test(item.companyName) || new 
			RegExp(options.keywords).test(item.job)
			if(!options.city){
				if(flag){
				result.push(item)
				}
			}else{
				if(options.city==item.cityName && flag){
					result.push(item)
				}
			}
			
		}
		return result
	}
})
angular.module("app").service("xiangqing_content_service",["$http",function($http){
			this.all=function(){
				return $http({
					url:"../data/company.json",
					method:"get"
				}).then(function(res){
					return res.data
					console.log(res.data)
				})
			}
			this.oneId=function(id){
				return this.all().then(function(data){
					for (var i=0;i<data.length;i++) {
						if(data[i].id==id){
							return data[i]
						}
					}
				})
			}
}])
angular.module("app").service("cityList_service",["$http",function($http){
			this.all=function(){
				return $http({
					url:"../data/city.json",
					method:"get"
				}).then(function(res){
					return res.data
					console.log(res.data)
				})
			}
			this.oneId=function(id){
				return this.all().then(function(data){
					for (var i=0;i<data.length;i++) {
						if(data[i].id==id){
							return data[i]
						}
					}
				})
			}
}])
angular.module("app").service("keywords_service",["$http",function($http){
	this.set=function(key,value){
		var jsonstr=JSON.stringify(value)
		localStorage.setItem(key,jsonstr)
	}
	this.get=function(key){
		var str=localStorage.getItem(key)
		
		return str ? JSON.parse(str):[];
	}
}])
angular.module("app").service("work_content_service",["$http",function($http){
			this.all=function(){
				return $http({
					url:"../data/jobList.json",
					method:"get"
				}).then(function(res){
					return res.data
				})
			}
			this.oneId=function(id){
				return this.all().then(function(data){
					for (var i=0;i<data.length;i++) {
						if(data[i].id==id){
							return data[i]
						}
					}
				})
			}
}])