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