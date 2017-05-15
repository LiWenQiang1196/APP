angular.module('app').config(['$validationProvider', function($validationProvider) {
    var expression = {
        phone: /^(1[3|5|7|8]{1}\d{9})$/,
        password: function(str) {
            str = str + '';
            return str.length >= 6
        }
    };


    var validMsg = {
        phone: {
            error: '请输入合法的手机号',
            success: ''
        },
        password: {
            error: '密码不能少于6位',
            success: ''
        }
    };
    $validationProvider.setExpression(expression) // set expression
        .setDefaultMsg(validMsg);
}])