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