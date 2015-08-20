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

jQuery.fn.extend({ 

    /**
     * 表单提交时验证必填项
     */
    checkRequire: function (id) { //id为表单提交的按钮
        var main = this;
            main.extend({
            // 检测必填项
            require: main.find('.require'),
            // 检测最大长度
            maxlength: main.find('.maxlength'),
            // 检测最小长度
            minlength: main.find('.minlength'),
            check: function () {
                var submit = true;
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
                    }
                });

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


 


