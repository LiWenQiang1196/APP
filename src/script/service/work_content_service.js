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