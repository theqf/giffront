
function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        }
        else {
            len += 1;
        }
    }
    return len;
};

function isRealNum(val){
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if(val === "" || val ==null){
        return false;
    }
    if(!isNaN(val)){
        return true;
    }else{
        return false;
    }
}

function getRandCode(len){
    var d,e,b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",c = "";
    for (d = 0;d<len; d ++) {
        e = Math.random() * b.length, e = Math.floor(e), c += b.charAt(e);
    }
    return c;  
};

(function($,undefined){
	$.fn.zySearch = function(options,param){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("zySearch - No such method: " + options);
			}
		}

		return this.each(function(){
			var para = {};    // 保留参数
			var self = this;  // 保存组件对象
			
			var defaults = {
					"width":"355",
					"height":"33",
					"callback":function(keyword){
						console.info("搜索的关键字");
						console.info(keyword);
					}
			};
			
			para = $.extend(defaults,options);
			
			this.init = function(){
				this.createHtml();  // 创建组件html
			};
			
			/**
			 * 功能：创建上传所使用的html
			 * 参数: 无
			 * 返回: 无 
			 */
			this.createHtml = function(){
				
				var html = '';
				html += '<b class="search-img"></b>'; 
				html += '<input id="searchInput" class="search-input" type="text" maxlength="30" placeholder="请输入要生成gif的文字">';
				html += '<input id="wInput" class="wInput" type="text" size="5" placeholder="长默认100">';
				html += '<input id="hInput" class="hInput" type="text" size="5" placeholder="宽默认80">';
				html += '<button class="search-btn btn">生成</button>';
				
				$(self).append(html);
				
	            // 初始化html之后绑定按钮的点击事件
	            this.addEvent();
			};
			
			
			/**
			 * 功能：绑定事件
			 * 参数: 无
			 * 返回: 无
			 */
			this.addEvent = function(){
				// 判断现在是否在移动设备上或屏幕小的情况下点击
				if($("."+para.parentClass).css("width")!="320px"){  // 不是
					// 解除事件
					$('#searchInput').unbind('focus').unbind('blur');
					// 需要修改图片当前top值
					$(".search-img").css({"top": "0px","height":"0px"});
					$('#searchInput').blur();  // 移除焦点
					$("#searchInput").bind("focus",function(){
						$(".search-img").animate({"top": "-23px","height":"24px"}, "slow");
					});
					$("#searchInput").bind("blur",function(){
						$(".search-img").animate({"top": "0px","height":"0"}, "slow");
					});
				}else{  // 是
					$('#searchInput').unbind('focus').unbind('blur');
					$(".search-img").css({"top":"1px","height":"0px"});
					$('#searchInput').blur();  // 移除焦点
					$("#searchInput").bind("focus",function(){
						$(".search-img").animate({"top": "-40px","height":"24px"}, "slow");
					});
					$("#searchInput").bind("blur",function(){
						$(".search-img").animate({"top": "1px","height":"0px"}, "slow");
					});
				}
				
				// 监听浏览器变化
				$(window).resize(function(){
					if($("."+para.parentClass).css("width")!="320px"){  // 不是
						// 解除事件
						$('#searchInput').unbind('focus').unbind('blur');
						// 需要修改图片当前top值
						$(".search-img").css({"top": "0px","height":"0px"});
						$('#searchInput').blur();  // 移除焦点
						$("#searchInput").bind("focus",function(){
							$(".search-img").animate({"top": "-23px","height":"24px"}, "slow");
						});
						$("#searchInput").bind("blur",function(){
							$(".search-img").animate({"top": "0px","height":"0"}, "slow");
						});
					}else{
						$('#searchInput').unbind('focus').unbind('blur');
						$(".search-img").css({"top":"1px","height":"0px"});
						$('#searchInput').blur();  // 移除焦点
						$("#searchInput").bind("focus",function(){
							$(".search-img").animate({"top": "-40px","height":"24px"}, "slow");
						});
						$("#searchInput").bind("blur",function(){
							$(".search-img").animate({"top": "1px","height":"0px"}, "slow");
						});
					}
				});
				
				// 添加搜索回车事件
				document.onkeydown=function(event){
		            var e = event || window.event || arguments.callee.caller.arguments[0];
		            if(e && e.keyCode==13){ // enter 键
		            	// 回调方法
		            	para.callback($("#searchInput").val());
		            }
		        }; 
		        
		        $(".search-btn").bind("click",function(){
		        	// 回调方法
	            	para.callback($("#searchInput").val()); 
	            	console.info("btn click");
	            	var inputValue = $("#searchInput").val();
	            	if(inputValue == 0){
	            		alert("输入为空");
	            		return;
	            	}
	            	if(getByteLen(inputValue) > 30){
	            		alert("len then 30");
	            	}
	            	
	            	var myData = new Date(); 
	            	var frandname = getRandCode(16);
	            	var filename = myData.getTime() + frandname;
	            	var x_w = $("#wInput").val();
	            	var x_h = $("#hInput").val();
	            	if(!isRealNum(x_w)){
	            		x_w = 100;
	            	}
	            	if(!isRealNum(x_h)){
	            		x_h = 80;
	            	}
	            	
	            	$.ajax({
	            		type:"POST",
	            		url:"./cgif",//web.xml中的url-pattern，使用struts改成：命名空间/action_**即可.0
	            		data:{
	            			cValue:inputValue,
	            			fileName:filename,
	            			x_w:x_w,
	            			x_h:x_h,
	            		},
	            		dataType:"text",//类型
	            		beforeSend:function(XMLHttpRequest){
	            			console.info("loading");
	            		},
	            		success:function(data,textStatus){//data代表servlet返回的数据，随意命名，一般写msg
	            			console.info("show  ",data);
	            			var html = '';
	        				html += '<h5 bgcolor=#rrggbb>当前生成的图片(请右击另存为):</h1><img src="'+ data +'"> </img>'; 
	        				$('#imgshow').html(html);
	            		},
	            	});
				});
			};
			// 初始化上传控制层插件
			this.init();
		});
	};
})(jQuery);

