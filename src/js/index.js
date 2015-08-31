$(function(){
    //执行title hover事件
    styleTitle();

    //初始化联合下拉组件 
    selUnion.init('unionSleArea', 'mainSel', 'childSelect', opdata1);
    //$("#mainSel").bind("change",op.change(false,true,'unionSleArea','secSel','childSelect',opdata2));
    $("#mainSel").bind("change", function() {
        op.chan(false, true, 'unionSleArea', 'secSel', 'childSelect', opdata2);
    });
    $("#secSel").bind("change", function() {
        op.chan(true, true, 'unionSleArea', 'thirdsel', 'childSelect', opdata3);
    });
    $("#thirdsel").bind("change", function() {
        op.chan(true, true, 'unionSleArea', 'forthsel', 'childSelect', opdata4);
    });

    //选择对象提示
    $("#popTips").bind("click", function() {
        promptMessageDialog({
            icon: "warning",
            content: "请填写意见建议！"
        }); //成功finish；警告warning；错误error；提示hint；疑问query
    });


    //考试试卷---确认弹框
    $("#testComfor").bind("click", function() {      
        function toDeleteNews() {
            alert("成功");
        }
        cueDialog(toDeleteNews, this, false, "你确定要删除此图片吗？");
    }); 

    //添加完成---弹出窗口  
 $("#addPage").unbind().bind("click", function() {
   var addLocationDialogHTML = '<div class="customTipsWrap tipsHint"><i class="icon_hintSmall floatL"></i><div class="floatL width298">提示：对学生当月动态的评价需在下月完成。</div><div class="clear"></div></div><form class="formStyle" name="" method="post" action="#" id=""><fieldset><div class="formStyle-item"><label for="" class="formStyle-label">评价开始时间:</label><select id="province" name="province" class="customForm_inputBoxDefault customForm_select grid_col2 marginR10 marginL10"><option value="">1号</option></select>到<select id="province" name="province" class="customForm_inputBoxDefault customForm_select grid_col2"><option value="">1号</option></select></div><div class="formStyle-item"><label for="" class="formStyle-label">评价结束时间:</label><select id="province" name="province" class="customForm_inputBoxDefault customForm_select grid_col2 marginR10"><option value="">1号</option></select>到<select id="province" name="province" class="customForm_inputBoxDefault customForm_select grid_col2"><option value="">1号</option></select></div></fieldset></form>';
     styledialog.initDialogHTML({
         title: "添加",
         content: addLocationDialogHTML,
         width: 640, 
         confirm: {
             show: true,
             name: "确认"
         },
         cancel: {
             show: true,
             name: "取消"
         }
     });
     styledialog.initContent("添加", addLocationDialogHTML, addLocationEvent);

     function addLocationEvent() {
         
     }
 });


  //图表
   $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Average Rainfall'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'London',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }, {
            name: 'Berlin',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }]
    });
  
  //表单全选
    var tablesOps = new tablesOp({
        'o': 'checkAllObj',
        'item': 'checkboxItem',
        'del': 'del',
    });
    tablesOps.init();
 
    //表单提交时候验证 必填项 最大长度 最小长度
    $('form[name="formExamSetting"]').checkRequire("examSettingComfor");


    //验证用户名、手机号码、电话号码、邮箱、中文、身份证号 
    $("#testValidate").bind("click", function() {


        if (adValidate.checkUser($(".userValidate").val()) == false) {
            
            alert("您输入的用户名不正确");
     
        }

    }); 


    //富文本编辑器
    var editor = new UE.ui.Editor();
    editor.render('editorArticle');


    //测试ajax
    $("#testAjx").bind("click", function() {
        var my_data = "前台变量";        
        $.ajax({
            url: "../control/index.php",
            type: "POST",
            data: {
                trans_data: my_data
            },
            //dataType: "json",
            error: function() {
                alert('Error loading XML document');
            },
            success: function(data, status) { //如果调用php成功    
               // alert(unescape(data)); //解码，显示汉字                         
               alert(data.msg);
            }
        });

    });

    //翻页
     function disscussContent(data) {
                console.log(data);
                var obj = null;
                try {
                    obj = eval('(' + data + ')');
                } catch (ex) {
                    obj = data;
                }
                 var pageContent=$(".pageContent")
                function setDisscussHTML(objR) { 
                    console.log(objR);
                    if (objR.count > 0) {
                        var list_html = '';
                            list_html += "<li class=\"articleItem\">";
                            list_html += "<div class=\"doc_name\">";
                            list_html += "<a href=\"\" target=\"_blank\">";
                            list_html += objR.data[index].tit;
                            list_html += "<\/a>";
                            list_html += "<\/div>";
                            list_html += "<div class=\"doc_intro\">";
                            list_html += objR.data[index].content;
                            list_html += "<\/div>";
                            list_html += "<\/li>";

                        pageContent.find("ul").html(list_html);

                    } else {

                        pageContent.find("ul").html("抱歉，没有相关结果。");                        

                    }
                }
                 
                var requestMenberpage = new jsPage(obj.count, "pageNum", "4", requestUrl,requestData, setDisscussHTML);
                pageMethod.call(requestMenberpage);
            }
            var site_id=123456,target='magzine';
            var requestData = 123
            var requestUrl = "../control/indexPage.php";

            AjaxForJson(requestUrl, requestData, disscussContent, null);
    

    
});

 


