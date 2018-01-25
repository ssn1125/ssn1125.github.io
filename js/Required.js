/*
 引入本JS文件前  需先引入jQuery文件
 */

// 将前台传递过来的JavaScript字符串执行
function executeWinformStrCode(StringCode) {
	var method = new Function(StringCode);
	method();
	delete method;
}

// 传递sql得到json数据
function getJsonDataBySql(SQL) {
	var result = window.external.query(SQL);
	return result;
}

// 调用C#方法  传递参数
function callMethod(MethodName,params) { 
	alert('JavaScript ： callMethod -> 调用方法：' + MethodName + '   传递参数：' + params);
	var method = (new Function("window.external."+ MethodName +"(" + params + ");"))(); 
	return method();
}
