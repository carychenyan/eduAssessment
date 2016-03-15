//公共弹框
var styledialog = {
    initDialogHTML: function (settings) {
        this.settings = {
            title: "",
            content: "",
            width: 710,
            url: "",
            confirm: {
                show: true,
                name: "确认",
                disablie: false
            },
            cancel: {
                show: false,
                name: "取消"
            },
            button: {
                show: false,
                html: ""
            }
        }
        $.extend(this.settings, settings || {});
        if (this.settings.url) {
            var responseObj = $.ajax({
                url: this.settings.url,
                async: false
            }).responseText;
            try {
                this.settings.content = eval('(' + responseObj + ')');
                if (this.settings.content.type == "login") {
                    loginDialog();
                    return;
                }
            }
            catch (e) {
                this.settings.content = responseObj;
            }
        }
        var dialogConHtml = '<div class="m-normalPop s-bsdStyle1" style="margin:0;width:' + this.settings.width + 'px;" id="PopupsFra"><div class="tt"><strong>' + this.settings.title + '</strong><a class="floatR Popups_close" href="javascript:;" title="关闭"></a></div><div id="editFraCon" name="editFraCon" style="width:' + this.settings.width + 'px;"><div class="ct editCon">' + this.settings.content + '</div>';
        if (this.settings.button.show || this.settings.confirm.show || this.settings.cancel.show) {
            //dialogConHtml += '<div class="m-ftc">';

            dialogConHtml += '<div id="PopupsFunc" class="w-btn ft"><div class="option">';
            if (this.settings.button.show) {
                dialogConHtml += this.settings.button.html;
            }
            if (this.settings.confirm.show) {
                dialogConHtml += '<input name="confirm" type="button" class="customBtn colourBlack marginR10" value="' + this.settings.confirm.name + '">';
            } 

            if (this.settings.cancel.show) {
                dialogConHtml += '<input name="cancel" type="button" class="customBtn colourLightGray" value="' + this.settings.cancel.name + '">';
            }

            dialogConHtml += '</div></div>';
            //dialogConHtml += '</div>';
        }
        dialogConHtml += '</div></div><div id="divBg" class="pageBg"><iframe style="position: absolute;width: 100%;height: 100%;z-index:-1;"></iframe></div>';
        $("body").eq(0).append(dialogConHtml);

        $("#divBg").css("display", "block");
        $("#PopupsFra").css("display", "block");
        var main = this;
        $("#PopupsFra .icon-close").bind("click", function () {
            main.closeDialog();
            return false;
        });
        $("#PopupsFunc input[name='cancel']").bind("click", function () {
            main.closeDialog();
            return false;
        });
        this.initContent();
    },

    initContent: function (tittleCon, contentHTML, eventFun) {

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
        var dialogHeight = $("#PopupsFra")[0].clientHeight;
        var dialogWidth = $("#PopupsFra")[0].clientWidth;
        $("#divBg").css({
            "width": document.body.offsetWidth,
            "height": document.body.offsetHeight < $(window).height() ? $(window).height() : document.body.offsetHeight
        });
        var PopupsFraTop = windowHeight / 2 - dialogHeight / 2 + bodyScrollTop >= 0 ? windowHeight / 2 - dialogHeight / 2 + bodyScrollTop : 0;
        var PopupsFraLfet = windowWidth / 2 - dialogWidth / 2 + bodyScrollLeft >= 0 ? windowWidth / 2 - dialogWidth / 2 + bodyScrollLeft : 0;
        $("#PopupsFra").css({
            "top": PopupsFraTop,
            "left": PopupsFraLfet
        });

        if (eventFun != null) {
            eventFun();
        }
    },

    initInsideDialogHTML: function (settings) {
        this.settings = {
            title: "",
            content: "",
            width: 710,
            url: "",
            confirm: {
                show: true,
                name: "确认",
                disablie: false
            },
            cancel: {
                show: true,
                name: "取消"
            },
            button: {
                show: false,
                html: ""
            }
        }
        $.extend(this.settings, settings || {});
        if (this.settings.url) {
            var responseObj = $.ajax({
                url: this.settings.url,
                async: false
            }).responseText;
            try {
                this.settings.content = eval('(' + responseObj + ')');
                if (this.settings.content.type == "login") {
                    this.settings.content = '<form action="' + commonParams.sqDevPath + '/DDApi/auth/clientauthorizeinfo" method="post" id="loginFrom"><div class="userId">账 号：<input name="userName" id="userName" type="text"></div><div class="PW">密 码：<input name="userPass" id="userPass" type="password"></div><input type="hidden" name="access_token" id="access_tokens" value="fe5d5df6acdf4854c36751439b95edc5"><input type="hidden" name="appKey" id="appKey" value="b8c8320d9c6d35c0b7dc412a44549bbb"><input type="hidden" name="callBackUrl" id="callBackUrl" value="' + commonParams.jcDevPath + '/Sign/callBack"><input type="hidden" name="responseType" id="responseType" value="code"><input type="hidden" name="state" id="state" value="' + commonParams.jcDevPath + '"><div class="btn"><input name="" type="submit" value="登 录" class="loginBtn"><a href="javascript:;" title="" target="" class="grayA" onclick="history.go(-1)">取消</a></div></form>';
                }
            }
            catch (e) {
                this.settings.content = responseObj;
            }
        }
        var dialogConHtml = '<div class="m-POP s-POP" style="width:' + this.settings.width + 'px;" id="insidePopupsFra"><div class="tt clearfix"><h5 class="hd">' + this.settings.title + '</h5><a class="icon-close f-fr upload-close" href="javascript:;" title="关闭"></a></div><div id="insideEditFraCon" name="insideEditFraCon" style="width:' + this.settings.width + 'px;"><div class="ct">' + this.settings.content + '</div>';
        if (this.settings.button.show || this.settings.confirm.show || this.settings.cancel.show) {
            //dialogConHtml += '<div class="m-ftc">';
            dialogConHtml += '<div id="insidePopupsFunc" class="w-btn ft">';
            if (this.settings.button.show) {
                dialogConHtml += this.settings.button.html;
            }
            if (this.settings.confirm.show) {
                dialogConHtml += '<input name="confirm" type="button" class="customBtnLarge colourDarkblue f-mr10" value="' + this.settings.confirm.name + '">';
            }
            if (this.settings.cancel.show) {
                dialogConHtml += '<input name="cancel" type="button" class="customBtnLarge colourLightGray" value="' + this.settings.cancel.name + '">';
            }
            dialogConHtml += '</div>';
            //dialogConHtml += '</div>';
        }

        dialogConHtml += '</div></div><div id="insideDivBg" class="pageBg"></div>';
        $("body").eq(0).append(dialogConHtml);

        $("#insideDivBg").css("display", "block");
        $("#insideDivBg").css("z-index", "911");
        $("#insidePopupsFra").css("z-index", "912");

        var main = this;
        $("#insidePopupsFra h5 .icon-close").bind("click", function () {
            main.closeInsideDialog();
            return false;
        });
        $("#insidePopupsFunc input[name='cancel']").bind("click", function () {
            main.closeInsideDialog();
            return false;
        });
    },

    initInsideDialogContent: function (tittleCon, contentHTML, eventFun) {

        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var bodyScrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            bodyScrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        var documentHeight = document.documentElement.clientHeight + document.documentElement.scrollHeight;
        var documentWidth = document.documentElement.clientWidth + document.documentElement.scrollWidth;
        var dialogHeight = $("#insidePopupsFra")[0].clientHeight;
        var dialogWidth = $("#insidePopupsFra")[0].clientWidth;
        $("#insideDivBg").css({
            "width": document.body.offsetWidth,
            "height": document.body.offsetHeight < $(window).height() ? $(window).height() : document.body.offsetHeight
        });
        var PopupsFraTop = windowHeight / 2 - dialogHeight / 2 + bodyScrollTop >= 0 ? windowHeight / 2 - dialogHeight / 2 + bodyScrollTop : 0;
        var PopupsFraLfet = windowWidth / 2 - dialogWidth / 2 >= 0 ? windowHeight / 2 - dialogHeight / 2 + bodyScrollTop : 0;
        $("#insidePopupsFra").css({
            "top": PopupsFraTop,
            "left": windowWidth / 2 - dialogWidth / 2
        });
        if (eventFun != null) {
            eventFun();
        }
    },

    closeDialog: function () {
        document.body.parentNode.style.overflow = "";
        $("#PopupsFra").remove();
        $("#divBg").remove();
    },
    closeInsideDialog: function () {
        document.body.parentNode.style.overflow = "";
        $("#insidePopupsFra").remove();
        $("#insideDivBg").remove();
    }

}

//确认弹框
function cueDialog(confirmFun, that, inside, content) {
    var cueContent = "确定要删除吗？删除后不可恢复。";
    if (content) {
        cueContent = content;
    }
    var cueHTML = '<div class="customTipsWrap"><i class="icon_query f-fl"></i><div class="f-fl width252 f-fs14 f-pt5 f-mb10">' + cueContent + '</div><div class="clear"></div></div>';
    if (inside) {
        styledialog.initInsideDialogHTML({
            title: "提示",
            content: cueHTML,
            width: 330,
            confirm: {
                show: true,
                name: "确定"
            },
            cancel: {
                show: true,
                name: "取消"
            }
        });
        styledialog.initInsideDialogContent("提示", cueHTML, null);
    } else {
        styledialog.initDialogHTML({
            title: "提示",
            content: cueHTML,
            width: 330,
            confirm: {
                show: true,
                name: "确定"
            },
            cancel: {
                show: true,
                name: "取消"
            }
        });
        styledialog.initContent("提示", cueHTML, null);
    }
    $(".w-btn input[name='confirm']").unbind().bind("click", function () {
        //var btnloading = new btnLoading(this);
        //btnloading.toLoading(); //提交按钮变loading图片
        confirmFun(that);
        if (inside) {
            styledialog.closeInsideDialog();
        } else {
            styledialog.closeDialog();
        }
        return false;
    });
    $(".w-btn input[name='cancel']").unbind().bind("click", function () {
        if (inside) {
            styledialog.closeInsideDialog();
        } else {
            styledialog.closeDialog();
        }
        return false;
    });
}

//提示弹框
function promptMessageDialog(settings) {
    this.settings = {
        icon: "finish",
        content: "操作成功！",
        time: 1000
    };
    $.extend(this.settings, settings || {});
    var iconSty = this.settings.icon == "success" || this.settings.icon == "finish" ? "finish" : this.settings.icon;
    var dialogContent = '<div class="customTipsSuccessfulOperation"><i class="icon_' + iconSty + '"></i>' + this.settings.content + '</div>';

    $("body").eq(0).append(dialogContent);

    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var bodyScrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        bodyScrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    var documentHeight = document.documentElement.clientHeight + document.documentElement.scrollHeight;
    var documentWidth = document.documentElement.clientWidth + document.documentElement.scrollWidth;
    var dialogHeight = $(".customTipsSuccessfulOperation")[0].clientHeight;
    var dialogWidth = $(".customTipsSuccessfulOperation")[0].clientWidth;
    var editFraTop = windowHeight / 2 - dialogHeight / 2 + bodyScrollTop >= 0 ? windowHeight / 2 - dialogHeight / 2 + bodyScrollTop : 0;
    var editFraLfet = windowWidth / 2 - dialogWidth / 2 >= 0 ? windowHeight / 2 - dialogHeight / 2 + bodyScrollTop : 0;
    $(".customTipsSuccessfulOperation").css({
        "top": editFraTop,
        "left": windowWidth / 2 - dialogWidth / 2,
        "position": "absolute",
        "z-index": "950"
    });
    if (this.settings.time > 0) {
        setTimeout(function () {
            $(".customTipsSuccessfulOperation").remove();
        }, this.settings.time);
    }
}

//登陆弹框
function loginDialog(callBack) {
    styledialog.closeDialog();
    styledialog.initDialogHTML({
        title: "登录",
        url: commonParams.jcDevPath + commonParams.jcType + "/index/login",
        width: 560,
        confirm: {
            show: false,
            name: "登陆"
        },
        cancel: {
            show: false,
            name: "取消"
        }
    });
    styledialog.initContent("登录", "", function () {
        $("#btn_login").die().live("click", function () {
            loginEvent();
        });

        $("input[name='userPass']").unbind().bind('keyup', function (event) {
            if (event.keyCode == 13) {
                loginEvent();
            }
        });

        function loginEvent() {
            if ($.trim($("input[name='userName']").val()) == "") {
                promptMessageDialog({
                    icon: "warning",
                    content: '用户名不能为空',
                    time: 1000
                });
                return;
            }
            if ($.trim($("input[name='userPass']").val()) == "") {
                promptMessageDialog({
                    icon: "warning",
                    content: '密码不能为空',
                    time: 1000
                });
                return;
            }
            var btnloading = new btnLoading($("input#btn_login")[0]);
            btnloading.toLoading(); //提交按钮变loading图片
            var requestData = $("form#loginFrom").serialize();
            var requestUrl = $("form#loginFrom").attr("action");
            $.ajaxJSONP(requestUrl, requestData, function (dataObj) {
                if (dataObj.errcode == "0") {
                    if (dataObj.role_code == "4") {
                        promptMessageDialog({
                            icon: "warning",
                            content: '课程平台目前仅限于学生、家长、教师账户登录',
                            time: 1000
                        });
                        AjaxForJson(commonParams.jcDevPath + "/sign/exit", null, function () { });
                        btnloading.toBtn();
                    }
                    else {
                        window.location.reload();
                    }
                }
                else if (dataObj.errcode == "1") {
                    promptMessageDialog({
                        icon: "warning",
                        content: '用户名密码错误',
                        time: 1000
                    });
                    $("input[name='userPass']").focus();
                    btnloading.toBtn();
                }
                else if (dataObj.errcode == "2") {
                    promptMessageDialog({
                        icon: "warning",
                        content: '尚未注册',
                        time: 1000
                    });
                    $("input[name='userPass']").focus();
                    btnloading.toBtn();
                }
                else {
                    promptMessageDialog({
                        icon: "warning",
                        content: '程序内部错误',
                        time: 1000
                    });
                    $("input[name='userPass']").focus();
                    btnloading.toBtn();
                }
            });
        }
    });
}