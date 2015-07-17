$(function() {

    //菜单下拉
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

    //联动下拉菜单【select】
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
 



//自定义hover title样式
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

