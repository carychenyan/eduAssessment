//全局地址配置
var commonParams = {
    dodoDevAccountPath: "http://dev-account.dodoedu.com",
    dodoYanxiuPath: window.location.protocol + "//" + window.location.host,
    dodoStaticPath: window.location.protocol + "//dev-images.dodoedu.com",
    dodoPhotoPath: "http://dev-images.dodoedu.com/image/"
        //dodoDevAccountPath: "https://account.dodoedu.com",
        //dodoYanxiuPath: "http://www.dodoedu.com",
        //dodoStaticPath: window.location.protocol + "//static.dodoedu.com",
        //dodoPhotoPath: "http://files.dodoedu.com/photo/"
};

//ajax调用公共方法
function AjaxForJson(requestUrl, requestData, SuccessCallback, errorCallback, successPar) {
    jQuery.ajax({
        type: "POST",
        url: requestUrl,
        data: requestData,
        //contentType: "application/json;charset=utf-8",
        //dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        dataType: "text",
        success: function(data) {
            var obj = null;
            try {
                obj = eval('(' + data + ')');
            } catch (ex) {
                obj = data;
            }
            if (obj == null) {
                return;
            }
            if (obj.status == 0) {
                window.location.href = commonParams.dodoDevAccountPath + "/login/login";
            } else if (obj.type == "login") {
                loginDialog();
            } else {
                if (obj.score) {
                    scoreDialog({
                        scoreNum: obj.score,
                        scoreDescribe: obj.honor_title
                    });
                }
                SuccessCallback(obj, successPar);
            }
            $('img').error(function() {
                $(this).attr('src', commonParams.dodoStaticPath + '/shequPage/common/image/noFindPic.gif');
                if ($(this).width() > 160) {
                    $(this).css('width', '160px');
                }
            });
        },
        error: function(err) {
            err;
        },
        complete: function(XHR, TS) {
            XHR = null;
        }
    });
}

//ajax跨域请求方法
jQuery.extend({
    ajaxJSONP: function(url, data, callback, errorCallback, successPar) {
        $.ajax({
            type: "get",
            async: false,
            url: url,
            data: data,
            dataType: "jsonp",
            jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            success: function(json) {
                if (json.status == 0) {
                    window.location.href = commonParams.dodoDevAccountPath + "/login/login";
                } else {
                    callback(json, successPar);
                }
            },
            error: function(e) {
                e;
            }
        });
    }
});

//动态加载js/css文件
function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //判断文件类型 
        var fileref = document.createElement('script'); //创建标签
        fileref.setAttribute("type", "text/javascript"); //定义属性type的值为text/javascript
        fileref.setAttribute("src", filename); //文件的地址
        var fileArr = filename.split("/");
        fileref.setAttribute("id", fileArr[fileArr.length - 1]);
    } else if (filetype == "css") { //判断文件类型 
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
}

//改进jquery动态加载js方法
//定义一个全局script的标记数组，用来标记是否某个script已经下载到本地
var scriptsArray = new Array();
$.cachedScript = function(url, options) {
    //循环script标记数组
    for (var s in scriptsArray) {
        //如果某个数组已经下载到了本地
        if (scriptsArray[s] == url) {
            return { //则返回一个对象字面量，其中的done之所以叫做done是为了与下面$.ajax中的done相对应
                done: function(method) {
                    if (typeof method == 'function') { //如果传入参数为一个方法
                        method();
                    }
                }
            };
        }
    }
    //这里是jquery官方提供类似getScript实现的方法，也就是说getScript其实也就是对ajax方法的一个拓展
    options = $.extend(options || {}, {
        dataType: "script",
        url: url,
        cache: true //其实现在这缓存加与不加没多大区别
    });
    scriptsArray.push(url); //将url地址放入script标记数组中
    return $.ajax(options);
};

//js正则验证用户信息
var adValidate = {
    //检测用户名
    checkUser: function(str) {
        var re = /^(?!_)(?!.*?_$)/;
        if (re.test(str) && str.length >= 4 && str.length <= 20) {
            return true;
        } else {
            return false;
        }
    },
    //验证手机号码
    //验证规则：11位数字，以1开头。
    checkMobile: function(str) {
        var re = /^1\d{10}$/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },

    //验证电话号码
    //验证规则：区号+号码，区号以0开头，3位或4位
    //号码由7位或8位数字组成
    //区号与号码之间可以无连接符，也可以“-”连接
    //如01088888888,010-88888888,0955-7777777 
    checkPhone: function(str) {
        var re = /^0\d{2,3}-?\d{7,8}$/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },

    //验证邮箱
    //验证规则：邮箱地址分成“第一部分@第二部分”这样
    //第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
    //第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
    //而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
    checkEmail: function(str) {
        var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },

    //验证中文
    checkNameCH: function(str) {
        var re = /[^\u4E00-\u9FA5]/g;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },

    //验证学号、教师证号
    checkIdentifier: function(str) {
        var re1 = /^\d{12}$/;
        var re2 = /^\d{20}$/;
        var re3 = /^\d{10}$/;
        if (re1.test(str) || re2.test(str) || re3.test(str)) {
            return true;
        } else {
            return false;
        }
    },

    //验证身份证号
    checkIDcards: function(str) {
        var aCity = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        };
        var iSum = 0;
        var info = "";
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(str))) {
            return false;
        }
        str = str.replace(/x$/i, "a");
        if (aCity[parseInt(str.substr(0, 2))] == null) {
            return false;
        }
        sBirthday = str.substr(6, 4) + "-" + Number(str.substr(10, 2)) + "-" + Number(str.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"));
        if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
            return false;
        }
        for (var i = 17; i >= 0; i--) {
            iSum += (Math.pow(2, i) % 11) * parseInt(str.charAt(17 - i), 11);
        }
        if (iSum % 11 != 1) {
            return false;
        }
        return true;
    }
};

//兼容firefox获得event对象
function getEvent() { //同时兼容ie和ff的写法
    if (document.all) return window.event;
    func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
}

//图片轮播
var appPic = {
    initPicPlayer: function(btnObj, animteObjName, imgWidth, iconClass) {
        var btns = btnObj;
        //选中的按钮
        var selectedBtn;
        //自动播放的id
        var playID;
        //选中图片的索引
        var selectedIndex;
        //选中的图片
        var selectedItem;
        //选中的按钮
        var selectedBtn;

        $("#" + animteObjName).css("width", imgWidth * btns.length + "px");
        $("#" + animteObjName).find("li").css("width", imgWidth + "px");
        for (var i = 0; i < btns.length; i++) {
            (function() {
                var index = i;
                btns[i].onclick = function() {
                    if (selectedBtn == this) {
                        return;
                    }
                    setSelectedItem(index);
                    return false;
                };
            })();
        }
        setSelectedItem(0);

        function setSelectedItem(index) {
            selectedIndex = index;
            clearInterval(playID);
            if ($("#" + animteObjName).is(":animated")) {
                return;
            }
            $("#" + animteObjName).animate({
                left: -imgWidth * index
            }, 500, function() {
                //自动播放方法
                playID = setTimeout(function() {
                    if (btns.length == 1) { //如果只有一张图片 则不滚动。
                        return;
                    }
                    var index = selectedIndex + 1;
                    if (index >= btns.length)
                        index = 0;
                    setSelectedItem(index);
                }, 5000);
            });
            if (selectedBtn) {
                $(selectedBtn).removeClass(iconClass);
            }
            selectedBtn = btns[parseInt(index)];
            btns.removeClass(iconClass);
            var that = btns[selectedIndex];
            $(that).addClass(iconClass);
        }
        $('.m-switcher').bind({
            mouseover: function() {
                $(this).find("div.arrow").css("display", "block");
            },
            mouseout: function() {
                $(this).find("div.arrow").css("display", "none");
            }
        });
        $("div.btn_left").unbind().bind("click", function() {
            if (selectedIndex == 0) {
                selectedIndex = btns.length;
            }
            setSelectedItem(selectedIndex - 1);
            return false;
        });
        $("div.btn_right").unbind().bind("click", function() {
            if (selectedIndex == btns.length - 1) {
                selectedIndex = -1;
            }
            setSelectedItem(parseInt(selectedIndex + 1));
            return false;
        });
        return false;
    }
};

// 时间戳转换日期   
function UnixToDate(unixTime, isFull, timeZone) {
        if (typeof(timeZone) == 'number') {
            unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
        }
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += time.getUTCFullYear() + "-";
        ymdhis += btok((time.getUTCMonth() + 1).toString(), 2, '0') + "-";
        ymdhis += btok(time.getUTCDate().toString(), 2, '0');
        if (isFull === true) {
            ymdhis += " " + btok((parseInt(time.getUTCHours() + 8)).toString(), 2, '0') + ":";
            ymdhis += btok(time.getUTCMinutes().toString(), 2, '0');
        }
        return ymdhis;
    }
    //填充文字： str 文本框对象, count 总字符长度 , charStr 填充字符
function btok(str, count, charStr) {
        var disstr = "";
        for (var i = 1; i <= (count - str.length); i++) {
            disstr += charStr;
        }
        str = disstr + str;
        return str;
    }
    //时间差计算
function jsDateDiff(publishTime, noYear) {
    var d_minutes, d_hours, d_days;
    var timeNow = parseInt(new Date().getTime() / 1000);
    var d;
    if (publishTime.toString().indexOf("-") > -1) {
        publishTime = new Date(publishTime = publishTime.replace(/-/g, "/"));
        publishTime = parseInt(publishTime / 1000);
    }
    d = timeNow - publishTime;
    d_days = parseInt(d / 86400);
    d_hours = parseInt(d / 3600);
    d_minutes = parseInt(d / 60);
    if (d_days > 0 && d_days < 10) {
        return d_days + "天前";
    } else if (d_days <= 0 && d_hours > 0) {
        return d_hours + "小时前";
    } else if (d_hours <= 0 && d_minutes > 0) {
        return d_minutes + "分钟前";
    } else if (d_minutes <= 0) {
        return "1分钟前";
    } else {
        var s = new Date(publishTime * 1000);
        if (noYear) {
            return (s.getMonth() + 1) + "-" + s.getDate();
        } else {
            return s.getFullYear() + "-" + (s.getMonth() + 1) + "-" + s.getDate();
        }
    }
}

/*
 *js实现分页
 **/
//方法驱动
function pageMethod() {
        var obj = this;
        obj.resetTotal();
        obj.reloadpageAjax(obj.currentPageNum, false);
        obj.page(); //生成页码
        ready2go.call(obj, false);
    }
    //跨域ajax分页
function callbackPageMethod() {
        var obj = this;
        obj.resetTotal();
        obj.reloadpageAjax(obj.currentPageNum, true);
        obj.page(); //生成页码
        ready2go.call(obj, true);
    }
    //添加页码点击事件
function ready2go(isBack) {
        var obj = this;
        $("#" + obj.page_obj_id + " a").die().live("click", function() {
            obj.target_p = parseInt($(this).attr("p"));
            gotopage.call(obj, obj.target_p, isBack);
        });
    }
    //跳转至哪一页
function gotopage(target, isBack) {
        this.cpage = target; //把页面计数定位到第几页
        this.page();
        this.reloadpageAjax(target, isBack);
    }
    //初始化各个属性
function jsPage(listLength, page_obj_id, pagesize, requesturl, requestdata, responsevent, currentpagenum, successpar) {
        // list_id 结果集UL的id
        // list_class 要显示的类别
        // page_id 存放页码的id
        // pagesize 每页显示多少条
        this.page_obj_id = page_obj_id;
        this.page_obj = $("#" + page_obj_id); //存放页码的div
        this.results = parseInt(listLength); // 总记录数等于所有记录

        this.totalpage; // 总页数
        this.pagesize = parseInt(pagesize); //每页记录数
        this.cpage = currentpagenum; //当前页,默认显示第一页
        this.count;
        this.target_p;
        this.curcount;
        this.outstr = ""; // 输出页码html 
        this.goNext = 5; //每次生成多少页码
        this.requestUrl = requesturl; //ajax请求地址
        this.requestData = requestdata; //ajax请求参数
        this.responseEvent = responsevent; //请求成功调用的方法
        this.successPar = successpar ? successpar : null; //请求成功调用方法的参数
        this.currentPageNum;
        if (currentpagenum) {
            this.currentPageNum = currentpagenum;
            this.cpage = parseInt(currentpagenum);
        } else {
            this.currentPageNum = 1;
            this.cpage = 1;
        }
    }
    //加载当前目标也内容
jsPage.prototype.reloadpage = function(p) {
    this.li.hide();
    for (var i = this.pagesize * p - this.pagesize; i < this.pagesize * p; i++) {
        this.li.eq(i).show(); //eq指定第几个li显示
    }
};
//ajax加载当前目标页内容
jsPage.prototype.reloadpageAjax = function(p, isBack) {
    if (isBack) {
        var requestData = this.requestData ? this.requestData : new Object();
        requestData["p"] = p;
        $.ajaxJSONP(this.requestUrl, requestData, this.responseEvent, null, this.successPar);
    } else {
        var requestData = this.requestData + "&p=" + p;
        AjaxForJson(this.requestUrl, requestData, this.responseEvent, null, this.successPar);
    }
};
//计算总页数
jsPage.prototype.resetTotal = function() {
    if (this.results == 0) {
        this.totalpage = 0;
        this.cpage = 0;
    } else if (this.results <= this.pagesize) {
        this.totalpage = 1;
    } else if (parseInt(this.results / this.pagesize) == 1) {
        this.totalpage = 2;
    } else if (parseInt(this.results / this.pagesize) > 1 && this.results % this.pagesize == 0) {
        this.totalpage = this.results / this.pagesize;
    } else {
        this.totalpage = parseInt(this.results / this.pagesize) + 1;
    }
};
//加载页面跳转控件
jsPage.prototype.page = function() {
    if (this.totalpage <= this.goNext) {
        for (this.count = 1; this.count <= this.totalpage; this.count++) {
            if (this.count != this.cpage) {
                this.outstr = this.outstr + "<a href='javascript:void(0)' p='" + this.count + "' >" + this.count + "</a>";
            } else {
                this.outstr = this.outstr + "<span class='current' >" + this.count + "</span>";
            }
        }
    }
    if (this.totalpage > this.goNext) {
        if (parseInt((this.cpage - 1) / this.goNext) == 0) {
            for (this.count = 1; this.count <= this.goNext; this.count++) {
                if (this.count != this.cpage) {
                    this.outstr = this.outstr + "<a href='javascript:void(0)' p='" + this.count + "' >" + this.count + "</a>";
                } else {
                    this.outstr = this.outstr + "<span class='current'>" + this.count + "</span>";
                }
            }
            this.outstr = this.outstr + "<a href='javascript:void(0)' p='" + this.count + "' >&raquo;</a>";
        } else if (parseInt((this.cpage - 1) / this.goNext) == parseInt(this.totalpage / this.goNext)) {
            this.outstr = this.outstr + "<a href='javascript:void(0)' p='" + (parseInt((this.cpage - 1) / this.goNext) * this.goNext) + "' >&laquo;<\/a>";
            for (this.count = parseInt(this.totalpage / this.goNext) * this.goNext + 1; this.count <= this.totalpage; this.count++) {
                if (this.count != this.cpage) {
                    this.outstr = this.outstr + "<a href='javascript:void(0)' p='" + this.count + "' >" + this.count + "</a>";
                } else {
                    this.outstr = this.outstr + "<span class='current'>" + this.count + "</span>";
                }
            }
        } else {
            var lastP;
            this.outstr = this.outstr + "<a href='javascript:void(0)' p='" + (parseInt((this.cpage - 1) / this.goNext) * this.goNext) + "' >&laquo;<\/a>";
            for (this.count = parseInt((this.cpage - 1) / this.goNext) * this.goNext + 1; this.count <= parseInt((this.cpage - 1) / this.goNext) * this.goNext + this.goNext; this.count++) {
                if (this.count != this.cpage) {
                    this.outstr = this.outstr + "<a href='javascript:void(0)' p='" + this.count + "' >" + this.count + "</a>";
                } else {
                    this.outstr = this.outstr + "<span class='current'>" + this.count + "</span>";
                }
                if (this.count == this.totalpage) {
                    lastP = "";
                } else {
                    lastP = "<a href='javascript:void(0)' p='" + (this.count + 1) + "' >&raquo;</a>";
                }
            }
            this.outstr = this.outstr + lastP;
        }
    }
    if (this.totalpage > 1) {
        this.Prestr = "<a href='javascript:void(0)' p='" + parseInt(this.cpage - 1) + "'>上一页</a>";
        this.startstr = "<a href='javascript:void(0)' p='" + 1 + "'>首页</a>";
        this.nextstr = "<a href='javascript:void(0)' p='" + parseInt(this.cpage + 1) + "'>下一页</a>";
        this.endstr = "<a href='javascript:void(0)' p='" + this.totalpage + "'>尾页</a>";
        if (this.cpage != 1) {
            if (this.cpage >= this.totalpage) {
                document.getElementById(this.page_obj_id).innerHTML = "<div>" + this.startstr + this.Prestr + this.outstr + "<\/div>";
            } else {
                document.getElementById(this.page_obj_id).innerHTML = "<div>" + this.startstr + this.Prestr + this.outstr + this.nextstr + this.endstr + "<\/div>";
            }
        } else {
            document.getElementById(this.page_obj_id).innerHTML = "<div>" + this.outstr + this.nextstr + this.endstr + "<\/div>";
        }
    } else {
        document.getElementById(this.page_obj_id).innerHTML = "";
    }
    this.outstr = "";
};

//提交ajax时将按钮变成loading图片防止重复提交
function btnLoading(that) {
        this.main = that;
        this.btnHTML = that.outerHTML;
    }
    //将提交按钮转换为loading图片
btnLoading.prototype.toLoading = function(ifCover) {
    $(this.main).replaceWith('<img id="btnLoading" class="loadingStyle"  src="' + commonParams.dodoStaticPath + '/yanxiuPage/img/loading.gif" alt="">');
    if (ifCover) {
        $("body").eq(0).append('<div id="coverImg" style="position:absolute;background:#f6f6f6;border:2px solid #C1C1C1;z-index:100;"><img style="margin: 0 10px;" src="' + commonParams.dodoStaticPath + '/shequPage/common/image/loading_1.gif" alt=""></div><div id="divCover" class="pageBg"></div>');
        $("#divCover").css("display", "block");
        var windowWidth, windowHeight;
        if (document.documentElement.clientWidth == 0) {
            windowWidth = document.documentElement.offsetWidth;
        } else {
            windowWidth = document.documentElement.clientWidth;
        }
        if (document.documentElement.clientHeight == 0) {
            windowHeight = document.documentElement.offsetHeight;
        } else {
            windowHeight = document.documentElement.clientHeight;
        }
        var bodyScrollTop = 0;
        var bodyScrollLeft = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            bodyScrollTop = document.documentElement.scrollTop;
            bodyScrollLeft = document.documentElement.scrollLeft;
        } else if (document.body) {
            bodyScrollTop = document.body.scrollTop;
            bodyScrollLeft = document.body.scrollLeft;
        }
        var documentHeight = document.documentElement.clientHeight + document.documentElement.scrollHeight;
        var documentWidth = document.documentElement.clientWidth + document.documentElement.scrollWidth;
        var dialogHeight = $("#coverImg")[0].clientHeight;
        var dialogWidth = $("#coverImg")[0].clientWidth;
        $("#divCover").css({
            "width": document.documentElement.scrollWidth,
            "height": document.documentElement.scrollHeight
        });
        var editFraTop = windowHeight / 2 - dialogHeight / 2 + bodyScrollTop >= 0 ? windowHeight / 2 - dialogHeight / 2 + bodyScrollTop : 0;
        var editFraLfet = windowWidth / 2 - dialogWidth / 2 + bodyScrollLeft >= 0 ? windowWidth / 2 - dialogWidth / 2 + bodyScrollLeft : 0;
        $("#coverImg").css({
            "top": editFraTop,
            "left": editFraLfet
        });
    }
};
//将loading图片转换为提交按钮
btnLoading.prototype.toBtn = function(ifCover) {
    $("img#btnLoading").replaceWith(this.btnHTML);
    if (ifCover) {
        $("#coverImg").remove();
        $("#divCover").remove();
    }
};
//提交ajax是内容中出现加载loading图片
function contentLoading(that) {
        that.html('<div name="contentLoadingDiv" style="margin-top:20px;margin-bottom:20px;text-align: center;"><img style="margin: 0 10px;" src="' + commonParams.dodoStaticPath + '/yanxiuPage/img/loading_2.gif" alt=""></div>');
    }
    //提交ajax是内容最后加载loading图片
function contentAppendLoading(that) {
        that.append('<div name="contentLoadingDiv" style="margin-top:20px;margin-bottom:20px;text-align: center;"><img style="margin: 0 10px;" src="' + commonParams.dodoStaticPath + '/yanxiuPage/img/loading_2.gif" alt=""></div>');
    }
    //移除内容中的loading图片
function removeContentLoading(that) {
    that.find("div[name='contentLoadingDiv']").remove();
}

//提交数据时特殊字符转换
function characterTransform(str) {
        str = str.replace(/\%/g, "%25");
        str = str.replace(/\+/g, "%2B");
        str = str.replace(/\&/g, "%26");
        return str;
    }
    //Html结构转字符串形式显示 支持<br>换行 
function ToHtmlString(htmlStr) {
        return toTXT(htmlStr);
    }
    //Html结构转字符串形式显示 
function toTXT(str) {
        if (str) {
            var RexStr = /\<|\>|\"|\'|\&|　| /g
            str = str.replace(RexStr,
                function(MatchStr) {
                    switch (MatchStr) {
                        case "<":
                            return "&lt;";
                            break;
                        case ">":
                            return "&gt;";
                            break;
                        case "\"":
                            return "&quot;";
                            break;
                        case "'":
                            return "&apos;";
                            break;
                        case "&":
                            return "&amp;";
                            break;
                        case " ":
                            return " &nbsp;";
                            break;
                        default:
                            return MatchStr;
                            break;
                    }
                });
        }
        return str;
    }
    //Html结构转字符串形式显示 
function toHTML(str) {
    if (str) {
        var RexStr = /\&lt;|\&gt;|\&quot;|\&apos;|\&amp;|\&nbsp;| /g
        str = str.replace(RexStr,
            function(MatchStr) {
                switch (MatchStr) {
                    case "&lt;":
                        return "<";
                        break;
                    case "&gt;":
                        return ">";
                        break;
                    case "&quot;":
                        return "\"";
                        break;
                    case "&apos;":
                        return "'";
                        break;
                    case "&amp;":
                        return "&";
                        break;
                    case "&nbsp;":
                        return " ";
                        break;
                    default:
                        return MatchStr;
                        break;
                }
            }
        )
    }
    return str;
}

// 时间戳转换日期   
function UnixToDate(unixTime, isFull, timeZone) {
        if (typeof(timeZone) == 'number') {
            unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
        }
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += time.getUTCFullYear() + "-";
        ymdhis += btok((time.getUTCMonth() + 1).toString(), 2, '0') + "-";
        ymdhis += btok(time.getUTCDate().toString(), 2, '0');
        if (isFull === true) {
            ymdhis += " " + btok((parseInt(time.getUTCHours() + 8)).toString(), 2, '0') + ":";
            ymdhis += btok(time.getUTCMinutes().toString(), 2, '0');
        }
        return ymdhis;
    }
    //填充文字： str 文本框对象, count 总字符长度 , charStr 填充字符
function btok(str, count, charStr) {
    var disstr = "";
    for (var i = 1; i <= (count - str.length); i++) {
        disstr += charStr;
    }
    str = disstr + str;
    return str;
}

//文件单位转换
function formatSize(size) {
    if (size) {
        rank = 0;
        rankchar = 'Bytes';
        while (size > 1024) {
            size = size / 1024;
            rank++;
        }
        size = Math.round(size * 100) / 100;
        if (rank == 1) {
            rankchar = "KB";
        } else if (rank == 2) {
            rankchar = "MB";
        } else if (rank == 3) {
            rankchar = "GB";
        }
        return size + " " + rankchar;
    } else {
        return "";
    }
}

//左右翻页
jQuery.fn.extend({
    horizontalScroll: function(cellWidth, count, rightwidth) {
        var mian = this;
        var conDiv = $(mian).find("[name='conDiv']");
        var showDiv = $(mian).find("[name='showDiv']");
        var cellDiv = $(mian).find("[name='cellDiv']");
        var toNextA = $(mian).find("a[name='toNextA']");
        var toPreA = $(mian).find("a[name='toPreA']");
        var rightWidth = rightwidth ? rightwidth : 0;

        var width = cellWidth * count * Math.round(cellDiv.length / count);
        conDiv.css("width", width + "px");

        toNextA.unbind().bind("click", function() {
            if (conDiv.is(":animated")) {
                return;
            }
            var toLeftLimit = (parseInt(conDiv[0].clientWidth / showDiv[0].clientWidth) - 1) * showDiv[0].clientWidth;
            if (conDiv.offset().left < showDiv.offset().left) {
                conDiv.animate({
                    left: conDiv.offset().left - showDiv.offset().left + showDiv[0].clientWidth + parseInt(rightWidth)
                }, 800, function() {
                    toPreA.removeClass("enabled");
                    if (showDiv.offset().left <= showDiv.offset().left) {
                        toNextA.addClass("enabled");
                    }
                });
            }
            return false;
        });

        toPreA.unbind().bind("click", function() {
            if (conDiv.is(":animated")) {
                return;
            }
            var toLeftLimit = (parseInt(conDiv[0].clientWidth / showDiv[0].clientWidth) - 1) * showDiv[0].clientWidth;
            if (conDiv.offset().left > -(toLeftLimit - showDiv.offset().left)) {
                conDiv.animate({
                    left: conDiv.offset().left - showDiv.offset().left - showDiv[0].clientWidth - parseInt(rightWidth)
                }, 800, function() {
                    toNextA.removeClass("enabled")
                    if (conDiv.offset().left <= -(toLeftLimit - showDiv.offset().left)) {
                        toPreA.addClass("enabled");
                    }
                });
            }
            return false;
        });
    },
    jionActDialog: function() {
        var mian = this;
        $(mian).unbind().bind("click", function() {
            styledialog.initDialogHTML({
                title: "申请活动",
                url: commonParams.dodoYanxiuPath + "/frontend/index/applyActivity",
                width: 642,
                confirm: {
                    show: true,
                    name: "确认"
                },
                cancel: {
                    show: true,
                    name: "取消"
                }
            });
            styledialog.initContent("申请活动", "", function() {
                $("#PopupsFunc").find("input[name='confirm']").unbind().bind("click", function() {
                    var btnloading = new btnLoading(this);
                    btnloading.toLoading(); //提交按钮变loading图片
                    var requestData = $("form#apply_form").serialize();
                    AjaxForJson($("form#apply_form").attr("action"), requestData, function(dataObj) {
                        if (dataObj.type == "success") {
                            styledialog.closeDialog();
                            styledialog.initDialogHTML({
                                title: "提交成功",
                                content: '<div class="imgDesc"><img src="' + commonParams.dodoStaticPath + '/yanxiuPage/img/creatStudyActiveDone.gif" alt="" /></div><div class="txtDesc"><h3>您的活动申请已成功提交专家审核。</h3><p>如审核通过，平台服务人员会与您取得联系，指导您进行相关资料的上传。感谢您的关注和参与！</p></div>',
                                width: 642,
                                confirm: {
                                    show: true,
                                    name: "我知道了~"
                                },
                                cancel: {
                                    show: false,
                                    name: "取消"
                                }
                            });
                            styledialog.initContent("提交成功", "", null);
                            $("#PopupsFunc").find("input[name='confirm']").unbind().bind("click", function() {
                                styledialog.closeDialog();
                            });
                        }
                    });
                });
            });
            return false;
        });
    }
});

//研修评分
var rateStarParams = {
    zsIndex: null,
    tyIndex: null
};
jQuery.fn.extend({
    //评分操作
    toRemark: function() {
        var mian = this;
        return (function() {
            $(mian).unbind().bind("click", function() {
                //$("div.ratePopUps").css("display", "block");
                if ($(mian).attr("data-uid") == "") {
                    loginDialog();
                } else {
                    styledialog.initDialogHTML({
                        title: "评分",
                        //url: commonParams.jcDevPath + commonParams.jcType + "/resource/remark",
                        content: '<div class="inner"><ul class="f-mb10"><input type="hidden" name="hdn_ty" value="0"><input type="hidden" name="hdn_zs" value="0"><li><strong class="font14">你来评分：</strong><span class="orangeTxt">点击星星就能打分！</span></li><li class="rateControl" id="li_zs">·<span>专题评分</span><span name="i_stars"><i class="icon_tc2"></i><i class="icon_tc2"></i><i class="icon_tc2"></i><i class="icon_tc2"></i><i class="icon_tc2"></i></span><span class="orangeTxt"></span></li></ul><span class="grayTxt f-fl mT5">评价可获得1金币，前五名双倍！</span><div class="f-cb "></div></div>',
                        width: 330,
                        confirm: {
                            show: true,
                            name: "确认"
                        },
                        cancel: {
                            show: true,
                            name: "取消"
                        }
                    });
                    styledialog.initContent("评分", "", function() {
                        $("li#li_zs").rateControl(new Array('', '', '', '', '', ''), "zsIndex");

                        $("#PopupsFunc input[name='confirm']").unbind().bind("click", function() {
                            var zs = rateStarParams.zsIndex ? rateStarParams.zsIndex + 1 : 0;
                            var ty = rateStarParams.tyIndex ? rateStarParams.tyIndex + 1 : 0;
                            AjaxForJson(commonParams.dodoYanxiuPath + $(mian).parent().find("input[name='special_eva_url']").val(), "user_id=" + $(mian).attr("data_uid") + "&special_id=" + $(mian).parent().find("input[name='special_id']").val() + "&evaluate_score=" + zs,
                                function(data) {
                                    if (data.type == "success") {
                                        styledialog.closeDialog();
                                        promptMessageDialog({
                                            icon: "finish",
                                            content: data.msg,
                                            time: 1000
                                        });
                                        setTimeout(function() {
                                            window.location.reload();
                                        }, 1000);
                                    } else {
                                        styledialog.closeDialog();
                                        promptMessageDialog({
                                            icon: "warning",
                                            content: data.msg,
                                            time: 1000
                                        });
                                    }
                                });
                            return false;
                        });
                    });
                }
                return false;
            });
        })();
    },
    //滑动评分插件
    rateControl: function(arrMark, starIndex) {
        var rateStarIndex = null;
        var main = this;
        var markAr = arrMark;
        if (this.length <= 0) {
            return false;
        }
        $(main).each(function() {
            var rateStarIcon = $(main).find("i");
            var rateStarLevel = $(main).find("span.orangeTxt");
            var markAr = arrMark;
            rateStarIcon.css("cursor", "pointer");
            rateStarIcon.bind({
                mouseover: function() {
                    var index = rateStarIcon.index($(this));
                    for (var n = 0; n < index + 1; n++) {
                        rateStarIcon[n].className = "icon_tc3";
                    }
                    rateStarLevel.html(markAr[index]);
                },
                mouseout: function() {
                    rateStarIcon.attr("class", "icon_tc2");
                    rateStarLevel.html(markAr[5]);
                },
                click: function() {
                    switch (starIndex) {
                        case "zsIndex":
                            rateStarParams.zsIndex = rateStarIcon.index($(this));
                            break;
                        case "tyIndex":
                            rateStarParams.tyIndex = rateStarIcon.index($(this));
                            break;
                        default:
                            break;
                    }
                    rateStarIndex = rateStarIcon.index($(this));
                    $("div.ratePopUps").find("a[name='a_confirm']").attr("class", "btnStyle1");
                    return false;
                }
            });
            $(this).find("span[name='i_stars']").bind("mouseleave", function() {
                if (rateStarIndex != null) {
                    for (var n = 0; n < rateStarIndex + 1; n++) {
                        rateStarIcon[n].className = "icon_tc3";
                    }
                    rateStarLevel.html(markAr[rateStarIndex]);
                }
            });
        });
    }
});

jQuery.fn.extend({
    /**
     * 获取焦点时清除默认文本
     * @return {jQuery}
     */
    clearText: function() {
        return this.each(function(i) {
            var defaultValue = $(this).data('default') ? $(this).data('default') : $(this).attr('datavalue');
            if (this.defaultValue == defaultValue) {
                this.style.color = "#b5b5b5";
                $(this).addClass('clearStyle');
            }
            $(this).bind({
                blur: function(e) {
                    this.value = jQuery.trim(this.value);
                    if (this.value.length <= 0 && jQuery.trim(this.defaultValue) == defaultValue) {
                        this.value = this.defaultValue
                        this.style.color = "#b5b5b5";
                        $(this).addClass('clearStyle');
                    } else {
                        $(this).removeClass('clearStyle');
                    }
                },
                focus: function(e) {
                    if (jQuery.trim(this.value) == defaultValue) {
                        this.value = "";
                        this.style.color = "#383838";
                    }
                    $(this).removeClass('clearStyle');
                }
            });
        });
    },


    /**
     * 获取焦点样式改变
     */
    changeStyle: function() {
        return this.each(function(i) {
            $(this).bind({
                blur: function(e) {
                    $(this).removeClass("inputBoxFocusStyle");
                },
                focus: function(e) {
                    $(this).addClass("inputBoxFocusStyle");
                }
            });
        });
    },


    /**
     *检验最大长度
     */
    checkMaxLen: function() {
        return this.each(function(i) {
            var max_length = $(this).attr("maxLength");
            if ($(this).val().length > max_length) {
                $(this).val($(this).val().substring(0, max_length));
            }
        });
    }
});