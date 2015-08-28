   /**
     *全局地址配置
     */ 
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

$(function() {   
 
    /**
    *菜单下拉
    */ 
    $(".nav ul>li").hover(function() { //二级菜单
        $(this).find("span").css("display", "block");
        $(this).find(".secUl").css("display", "block");
    }, function() {
        $(this).find("span").css("display", "none");
        $(this).find(".secUl").css("display", "none");
    });

    $(".secUl>li").hover(function() { //三级菜单 
        $(this).find(".thirdUl").css("display", "block");
    }, function() {
        $(this).find(".thirdUl").css("display", "none");
    });

});

    /**
    *联动下拉菜单【select】
    */     
    var opdata1 = {
        0: '请选择',
        1: '中国',
        2: '美国'
    };
    var opdata2 = {
        0: '请选择',
        1: '湖北',
        2: '湖南'
    };
    var opdata3 = {
        0: '请选择',
        1: '武汉',
        2: '咸宁'
    };
    var opdata4 = {
        0: '请选择',
        1: '汉口',
        2: '武昌',
        3: '汉阳'
    };

    var op = { //下拉选择对象 
        init: function(data, id) {
            var con = '';
            for (var i = 0; i <= data.length(); i++) {
                con += '<option value=' + i + '>' + data.i + '</option>'
            };
            $('#' + id).html(con);
        },
        chan: function(par, chi, unionId, childSelId, childSelClass, data) { //par和chi如果为true，表明存在父级跟子级
            if (par == false && chi == true) {
                $('#' + unionId).find("." + childSelClass).html('');
                var con = '';
                for (var i in data) {

                    con += '<option value=' + i + '>' + data[i] + '</option>'

                };
                $('#' + childSelId).html(con);
            } else if (par == true && chi == true) {
                var ind = $('#' + unionId + ' ' + '#' + childSelId).index(),
                    l = $('#' + unionId).find("select").length;
                var select = $('#' + unionId).find("." + childSelClass);
                for (var i = ind - 1; i < l; i++) {
                    select.eq(i).html('');
                };

                var con = '';
                for (var i in data) {

                    con += '<option value=' + i + '>' + data[i] + '</option>'

                };
                $('#' + childSelId).html(con);
            } else if (par == true && chi == false) {
                return;
            }
        }
    };

    var selUnion = { //联动组件 
        init: function(unionId, mainSelId, childSelClass, data) {
            //unionId 组件总id
            //mainSelId 第一组件id
            //childSelClass 子级选择样式名字
            //data 第一下拉选择数据
            var con = '';
            for (var i in data) {

                con += '<option value=' + i + '>' + data[i] + '</option>'

            };
            $('#' + mainSelId).html(con);
            $('#' + unionId).find("." + childSelClass).html('');
        }
    };
 


     /**
      *自定义hover title样式
      */
    var styleTitle = function () {
        var t;
        var tbox = document.createElement("div");
        tbox.id = "titleTips";
        tbox.className = "titleTips";
        tbox.style.display = "none";
        document.body.appendChild(tbox);
        var displayTime = null;
        $("[styleTitle='styleTitle']").live("mouseover", function () {
            //获取元素并赋值
            var tbox = document.getElementById("titleTips");
            //传当前内容
            tbox.innerHTML = '<em></em><span>' + $(this).attr("titleCon") + '</span>';

            tbox.style.position = "absolute";
            tbox.style.display = "block";
            tbox.style.left = getLeft(this) - getWidth($("#titleTips")[0]) / 2 + getWidth(this) / 2 + "px";
            tbox.style.top = getTop(this) + getHeight(this) + "px";
            if (displayTime) {
                clearTimeout(displayTime);
            }
            displayTime = setTimeout(function () {
                tbox.style.display = "none";
            }, 2000);
        });
        //离开敏感区触发
        $("[styleTitle='styleTitle']").live("mouseleave", function () {
            if (displayTime) {
                clearTimeout(displayTime);
            }
            tbox.style.display = "none";
        });
        //需要请求数据后再显示
        $("[name='likeCount']").live("mouseover", function () {
            var nameCount = $(this).html();
            if (nameCount == "0") {
                return;
            }
            //获取元素并赋值
            var tbox = document.getElementById("titleTips");

            var requestUrl = commonParams.dodoDevPath + "/widget/ThreeExtend/getLoveObjAjax";
            var requestData = "type=" + $(this).attr("type_name") + "&type_id=" + $(this).attr("type_id");
            var that = this;

            function responesFun(data) {
                if (data.type == "success") {
                    var names = "";
                    for (var i = 0; i < data.data.length; i++) {
                        if (i == 0) {
                            names += data.data[i].user_name;
                        } else {
                            names += "<br />" + data.data[i].user_name;
                        }
                    }
                    if (nameCount - data.data.length > 0) {
                        names += "<br />...等其他" + (nameCount - data.data.length) + "人";
                    }
                    //传当前内容
                    tbox.innerHTML = '<em></em><span>' + names + '</span>';

                    tbox.style.position = "absolute";
                    tbox.style.display = "block";
                    tbox.style.left = getLeft(that) - getWidth($("#titleTips")[0]) / 2 + getWidth(that) / 2 + "px";
                    tbox.style.top = getTop(that) + getHeight(that) + "px";
                    if (displayTime) {
                        clearTimeout(displayTime);
                    }
                    displayTime = setTimeout(function () {
                        tbox.style.display = "none";
                    }, 2000);
                } else if (data.type == "login") {
                    loginDialog();
                } else {
                    return;
                }
            }

            AjaxForJson(requestUrl, requestData, responesFun, null, null);
        });
        $("[name='likeCount']").live("mouseleave", function () {
            if (displayTime) {
                clearTimeout(displayTime);
            }
            tbox.style.display = "none";
        });

        $("#titleTips").live("mouseover", function () {
            if (displayTime) {
                clearTimeout(displayTime);
            }
            tbox.style.display = "none";
        });
        $("#titleTips").live("mouseleave", function () {
            if (displayTime) {
                clearTimeout(displayTime);
            }
            tbox.style.display = "none";
        });


        function getLeft(o) {
            var _oLeft = o.offsetLeft;
            while (o.offsetParent != null) {
                var _oParent = o.offsetParent;
                _oLeft += _oParent.offsetLeft;
                o = _oParent;
            }
            return _oLeft;
        }

        function getTop(o) {
            var _oTop = o.offsetTop;
            while (o.offsetParent != null) {
                var _oParent = o.offsetParent;
                _oTop += _oParent.offsetTop;
                o = _oParent;
            }
            return _oTop;
        }

        function getHeight(o) {
            return o.clientHeight || o.offsetHeight;
        }

        function getWidth(o) {
            return o.clientWidth || o.offsetWidth;
        }
    }; 
 

/**
 *表格[包含表格的全选、单选、删除、翻页]
 */ 
tablesOp=function(settings){
    var my =this;
        my.settings = {
            checkAll: settings.o, //全选最外层id
            item: settings.item ,//每一列inpu的name
            del: settings.del //每一列inpu的name
        };

    //全选
    my.checkAll = function() {
        var main = $("#" + my.settings.checkAll);
        var child = main.parent().parent().parent().siblings("tbody").find("input[name='" +my.settings.item + "']");
        main.bind("click", function() {
            var checkStatus = main.find("input").prop('checked');
            if (checkStatus) {
                child.prop('checked', true);
            } else {
                child.prop('checked', false);
            }
        });
    };

    //单选
    my.checkSingle = function() {
        var main = $("#" + my.settings.checkAll);
        var child = $("input[name='" + my.settings.item + "']");

        child.bind('click', function() {

            main.find("input").prop('checked', false);

        }); 
    }; 

    //删除单行
    my.del = function() {
        var delO = $("input[name='" + my.settings.del + "']");
        var id = delO.parent().parent().find("input[name='" + my.settings.item + "']").attr("id");
        delO.bind('click', function() {
            $(this).parent().parent().remove();
            //ajax后台
            /*var post_param = 'id=' + id ;

            function postEvent(obj) {
                if (obj.type == 'success') {
                    promptMessageDialog({
                        icon: "finish",
                        content: '操作成功！'
                    });
                    styledialog.closeDialog();
                }
            }

            AjaxForJson(commonParams.dodoDevPath + "/class/evaluate/evaluateRecordPost", post_param, postEvent, null);
            */
        });
    };

    //入口函数
    my.init=function(){
            my.checkAll();
            my.checkSingle();
            my.del();
    };    

};


/**
 *js正则验证用户信息
 */ 
var adValidate = {
    //检测用户名
    //验证规则：4到20位字符
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

jQuery.fn.extend({ 

    /**
     * 表单提交时验证必填项
     */
    checkRequire: function (id) { //id为表单提交的按钮
        var main = this;
        var submit = true;
            main.extend({
            // 检测必填项
            require: main.find('.require'),
            // 检测最大长度
            maxlength: main.find('.maxlength'),
            // 检测最小长度
            minlength: main.find('.minlength'),
            check: function () {                
                // 检查必填项
                main.require.each(function () {
                    var content = jQuery.trim(this.value);
                    if (content <= 0 || content == this.defaultValue) {
                        
                        if (($(this).next(".tipsForErro").css("display")) == undefined) {
                            $(this).focus().after("<span class='tipsForErro' style='color:red; padding-left:4px;'>该项为必填项</span>");
                        }
                        else{
                            return;
                        }
                        submit = false;
                        return false;
                    }
                    else{
                        $(this).blur().next(".tipsForErro").remove();
                         submit = true;

                    }
                });
                console.log(submit);
                if (submit == false) {//停顿，跳出检测函数                    
                    return false;
                }

                // 检查最大长度
                main.maxlength.each(function (i) {
                    var $this = $(this);
                    var maxlength = $(this).data('maxlength');
                    if (this.value.length > maxlength) {
                           
                        if (($(this).next(".tipsForErro").css("display")) == undefined) {
                            $this.focus().after("<span class='tipsForErro' style='color:red; padding-left:4px;'>最大长度不得超过" + maxlength + "个字符</span>");
                        } else {
                            return;
                        }

                        submit = false;
                        return false;
                    }
                    else{

                        $(this).blur().next(".tipsForErro").remove();
                        submit = true;
                    }
                });

                if(submit==false){//停顿，跳出检测函数
                    return false;
                }

                // 检查最小长度
                main.minlength.each(function (i) {
                    var $this = $(this);
                    var minlength = $(this).data('minlength');
                    if (this.value.length < minlength) {

                        if (($(this).next(".tipsForErro").css("display")) == undefined) {
                            $this.focus().after("<span class='tipsForErro' style='color:red; padding-left:4px;'> 最小长度不得低于" + maxlength + "个字符</span>");
                        }
                        else{
                            return;
                        }
                        
                        submit = false;
                        return false;
                    }
                    else{

                        $(this).blur().next(".tipsForErro").remove();
                        submit = true;
                    }
                });

                if(submit==false){//停顿，跳出检测函数
                    return false;
                }

                
            }
        });

        $("#" + id).bind({
            click: function(e) { 

                return main.check();

            }
        });

    }

});


/**
 *ajax调用公共方法
 */
function AjaxForJson(requestUrl, requestData, SuccessCallback, errorCallback) {
    //if (AjaxForJson.ajaxing) return;
    //AjaxForJson.ajaxing = true;   
    jQuery.ajax({
        type: "POST",
        url: requestUrl,
        data: requestData,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var obj = null; // $.parseJSON(data.d);
            try {
                eval("obj=" + data.d);
            } catch (ex) {

            }
            SuccessCallback(obj, callbackSelfParamObj);
        },
        error: function (err) { errorCallback(); },
        complete: function (XHR, TS) { XHR = null }
    });
}







 


