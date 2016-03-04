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
     *tab切换 ， 点击切换_分享、阅读等等
     */
    var tabItem = $(".projectTitleBor .projectName");
    tabItem.bind("click", function() {
        var i = $(this).index();
        $(this).parent().find(".projectName").removeClass("sel");
        $(this).addClass("sel");
        $(this).parent().parent().parent().find(".formItem-wrap").hide();
        $(this).parent().parent().parent().find(".formItem-wrap").eq(i).show();
    });

 
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
            var main = $("#" + my.settings.checkAll);
            console.log(main.parents(".tableSet"));
            main.parents(".tableSet").find("tr:even").css("background-color","#f9f9f9");
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

                        else if(($(this).next(".tipsForErro").html())!="该项为必填项"){

                            $(this).next(".tipsForErro").html("该项为必填项");

                        }
                        else
                            return;
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

    },
    /**
     *加载列表筛选
     */
    loadDataList:function(configs,select,operate){  
        // configs,select都是数组eg  ["../control/indexPage.php",1,"magzine"],["p","requestData"]
        // configs第一个参数是请求url,后面的是提交给后台的参数键值
        // select是传给后台的参数键名
        return this.each(function(i) {
            var settings=configs,sel=select,main=$(this);
            //var  = 'requestData=' + target + '&p=' + 1; //在php真实环境中是  site_id=123456&target='magzine'  且p翻页不需要带上
            var requestUrl = settings[0],requestDataTex='';
            for (var i = 1; i < settings.length; i++) {  
                   var j=sel[i - 1]+"="+settings[i];
                if (i ==1) {
                    requestDataTex +=j;
                } else {
                    requestDataTex +="&"+j;
                }
            }
            
            //翻页
             function disscussContent(data) { 

                        var obj = null;
                        try {
                            obj = eval('(' + data + ')');
                        } catch (ex) {
                            obj = data.data;
                        }
                          //console.log(obj);
                         var pageContent=main;
                        function setDisscussHTML(objR) { 
                         //console.log(objR);                     
                            if (objR.data.count > 0) {
                                 var list_html = ''; 
                                     
                                for (var index=0;index<objR.data.data.length;index++) { 
                                       var objRItem=objR.data.data[index];
                                       list_html+= "<tr>";
                                   for(var j in objRItem) {
                                            var tit=
                                            list_html += "<td>";
                                            list_html += objRItem[j];
                                            list_html += "</td>";
                                    } 
                                    if(operate!=undefined){
                                        list_html += "<td id="+objRItem.id+">"+operate.operate+"</td>";
                                    }   
                                    list_html+= "</tr>";                 
                                     
                                }
                                    

                                pageContent.find("ul").html(list_html);

                            } else {

                                pageContent.find("ul").html("抱歉，没有相关结果。");                        

                            }
                        }
                         
                        var requestMenberpage = new jsPage(obj.count, "pageNum", "3", requestUrl,requestDataTex, setDisscussHTML);
                         pageMethod.call(requestMenberpage);
             }
            AjaxForJson(requestUrl, requestDataTex, disscussContent, null);

        });
    }

});


/**
  上传文件
*/
jQuery.extend({
    createUploadIframe: function (id, uri) {
        //create frame   
        var frameId = 'jUploadFrame' + id;
        if (window.ActiveXObject) {
            var io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />');
            if (typeof uri == 'boolean') {
                io.src = 'javascript:false';
            }
            else if (typeof uri == 'string') {
                io.src = uri;
            }
        }
        else {
            var io = document.createElement('iframe');
            io.id = frameId;
            io.name = frameId;
        }
        io.style.position = 'absolute';
        io.style.top = '-1000px';
        io.style.left = '-1000px';
        document.body.appendChild(io);
        return io
    },
    createUploadForm: function (id, fileElementId, data) {
        //create form      
        var formId = 'jUploadForm' + id;
        var fileId = 'jUploadFile' + id;
        var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
        var oldElement = $('#' + fileElementId);
        var newElement = $(oldElement).clone();
        $(oldElement).attr('id', fileId);
        $(oldElement).before(newElement);
        $(oldElement).appendTo(form);
        //增加文本参数的支持   
        if (data) {
            for (var i in data) {
                $('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
            }
        }
        //set attributes   
        $(form).css('position', 'absolute');
        $(form).css('top', '-1200px');
        $(form).css('left', '-1200px');
        $(form).appendTo('body');
        return form;
    },

    ajaxFileUpload: function (s) {
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout           
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime()
        var form = jQuery.createUploadForm(id, s.fileElementId, s.data);
        var io = jQuery.createUploadIframe(id, s.secureuri);
        var frameId = 'jUploadFrame' + id;
        var formId = 'jUploadForm' + id;
        // Watch for a new set of requests   
        if (s.global && !jQuery.active++) {
            jQuery.event.trigger("ajaxStart");
        }
        var requestDone = false;
        // Create the request object   
        var xml = {}
        if (s.global)
            jQuery.event.trigger("ajaxSend", [xml, s]);
        // Wait for a response to come back   
        var uploadCallback = function (isTimeout) {
            var io = document.getElementById(frameId);
            try {
                if (io.contentWindow) {
                    xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                    xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;

                } else if (io.contentDocument) {
                    xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                    xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
                }
                try {
                    xml.responseText = $(xml.responseText).html();
                }
                catch (e) {; }
                //xml.responseText= xml.responseText.replace("<PRE>","").replace("</PRE>","").replace("<pre>","").replace("</pre>","");
            } catch (e) {
                jQuery.handleError(s, xml, null, e);
            }
            if (xml || isTimeout == "timeout") {
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified   
                    if (status != "error") {
                        // process the data (runs the xml through httpData regardless of callback)   
                        var data = jQuery.uploadHttpData(xml, s.dataType);
                        // If a local callback was specified, fire it and pass it the data   
                        if (s.success)
                            s.success(data, status);
                        // Fire the global callback   
                        if (s.global)
                            jQuery.event.trigger("ajaxSuccess", [xml, s]);
                    } else
                        jQuery.handleError(s, xml, status);
                } catch (e) {
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                }
                // The request was completed   
                if (s.global)
                    jQuery.event.trigger("ajaxComplete", [xml, s]);
                // Handle the global AJAX counter   
                if (s.global && ! --jQuery.active)
                    jQuery.event.trigger("ajaxStop");
                // Process result   
                if (s.complete)
                    s.complete(xml, status);
                jQuery(io).unbind()
                setTimeout(function () {
                    try {
                        $(io).remove();
                        $(form).remove();
                    } catch (e) {
                        jQuery.handleError(s, xml, null, e);
                    }

                }, 100)

                xml = null
            }
        }
        // Timeout checker   
        if (s.timeout > 0) {
            setTimeout(function () {
                // Check to see if the request is still happening   
                if (!requestDone) uploadCallback("timeout");
            }, s.timeout);
        }
        try {
            // var io = $('#' + frameId);   
            var form = $('#' + formId);
            $(form).attr('action', s.url);
            $(form).attr('method', 'POST');
            $(form).attr('target', frameId);
            if (form.encoding) {
                form.encoding = 'multipart/form-data';
            }
            else {
                form.enctype = 'multipart/form-data';
            }
            $(form).submit();
        } catch (e) {
            jQuery.handleError(s, xml, null, e);
        }
        if (window.attachEvent) {
            document.getElementById(frameId).attachEvent('onload', uploadCallback);
        }
        else {
            document.getElementById(frameId).addEventListener('load', uploadCallback, false);
        }
        return { abort: function () { } };
    },

    uploadHttpData: function (r, type) {
        var data = type == "xml" ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context   
        if (type == "script")
            jQuery.globalEval(data);
        // Get the JavaScript object, if JSON is used.   
        if (type == "json")
            eval("data = " + data);
        // evaluate scripts within html   
        if (type == "html")
            jQuery("<div>").html(data).evalScripts();
        //alert($('param', data).each(function(){alert($(this).attr('value'));}));   
        return data;
    },
    handleError: function( s, xhr, status, e )      {  
        // If a local callback was specified, fire it  
                if ( s.error ) {  
                    s.error.call( s.context || s, xhr, status, e );  
                }  
  
                // Fire the global callback  
                if ( s.global ) {  
                    (s.context ? jQuery(s.context) : jQuery.event).trigger( "ajaxError", [xhr, s, e] );  
                }  
    }  
});


/**
 *ajax调用公共方法
 */
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