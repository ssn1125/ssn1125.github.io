function executeWinformStrCode(StringCode) {
	var method = new Function(StringCode);
	method();
	delete method;
}

var echartsTitle = "主题";
var echartsSubText = "小标题";


/* load image */
function genData(jsons) {
	// 先将获得到的JsonArray字符串 转换成对象
	jsons = (new Function("return " + jsons))();
	var nameList = [];
	for(var i = 0; i < jsons.length ; i++) {
		nameList.push(jsons[i]['TITLE']);
	}
    var legendData = [];
    var seriesData = [];
    var selected = {};
    for (var i = 0; i < jsons.length; i++) {
        name = nameList[i];
        legendData.push(name);
        seriesData.push({
            name: name,
            value: jsons[i]['VAL']
        });
        selected[name] = jsons.length;
    }
    return {
        legendData: legendData,
        seriesData: seriesData,
        selected: selected
    };
}

// 获得用于显示拼图的div元素
var myCahrt = echarts.init(document.getElementById("main"));

// 接收前台查询数据 设置option 更新饼图数据
function setOptionShowData(jsons) {
	
	var data = genData(jsons);
	
	//  饼图参数
	option = {
	    title : {
	        text: echartsTitle,
	        subtext: echartsSubText,
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        type: 'scroll',
	        orient: 'vertical',
	        right: 10,
	        top: 20,
	        bottom: 20,
	        data: data.legendData,
	
	        selected: data.selected
	    },
	    series : [
	        {
	            name: '类别',
	            type: 'pie',
	            radius : '55%',
	            center: ['40%', '50%'],
	            data: data.seriesData,
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	
	//显示拼图
	myCahrt.setOption(option);
	
	// 设置饼图响应式
	window.addEventListener('resize',function(){
	    myCahrt.resize();
	});
	
}
