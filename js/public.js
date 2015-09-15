$(function(){
  
   //菜单下拉
   $(".nav ul>li").hover(function(){ //二级菜单
          $(this).find("span").css("display","block");
          $(this).find(".secUl").css("display","block");
      },function(){
         $(this).find("span").css("display","none");
         $(this).find(".secUl").css("display","none");
      }
   );
   
   $(".secUl>li").hover(function(){ //三级菜单 
          $(this).find(".thirdUl").css("display","block");
      },function(){ 
         $(this).find(".thirdUl").css("display","none");
      }
   );

    //联动下拉菜单【select】
    var opdata1={0:'请选择',1:'中国',2:'美国'};
    var opdata2={0:'请选择',1:'湖北',2:'湖南'};
    var opdata3={0:'请选择',1:'武汉',2:'咸宁'}; 
    var opdata4={0:'请选择',1:'汉口',2:'武昌',3:'汉阳'}; 

    var op={//下拉选择对象 
            init:function(data,id){
                 var con='';
                 for (var i = 0; i <= data.length(); i++) {
                    con+= '<option value='+i+'>'+data.i+'</option>' 
                 };
                 $('#'+id).html(con);
             },
             chan:function(par,chi,unionId,childSelId,childSelClass,data){//par和chi如果为true，表明存在父级跟子级
                if(par==false&&chi==true){ 
                    $('#'+unionId).find("."+childSelClass).html('');
                    var con='';
                    for (var i in data) {

                    con+= '<option value='+i+'>'+data[i]+'</option>' 

                    };
                    $('#'+childSelId).html(con);
                }
                else if(par==true&&chi==true){
                    var ind=$('#'+unionId+' '+'#'+childSelId).index(),l=$('#'+unionId).find("select").length;
                     var select=$('#'+unionId).find("."+childSelClass);
                     for (var i = ind-1; i<l; i++) {
                        select.eq(i).html('');
                     };
                     
                    var con='';
                    for (var i in data) {

                    con+= '<option value='+i+'>'+data[i]+'</option>' 

                    };
                    $('#'+childSelId).html(con);
                }
                else if(par==true&&chi==false){
                    return;
                }
             } 
    };

    var selUnion={//联动组件 
            init:function(unionId,mainSelId,childSelClass,data){
                //unionId 组件总id
                //mainSelId 第一组件id
                //childSelClass 子级选择样式名字
                //data 第一下拉选择数据
                var con='';
                for (var i in data) {

                    con+= '<option value='+i+'>'+data[i]+'</option>' 

                };
                $('#'+mainSelId).html(con);
                $('#'+unionId).find("."+childSelClass).html('');
            }
    };


    //初始化联合下拉组件 
	selUnion.init('unionSleArea','mainSel','childSelect',opdata1);
	//$("#mainSel").bind("change",op.change(false,true,'unionSleArea','secSel','childSelect',opdata2));
	$("#mainSel").bind("change",function(){op.chan(false,true,'unionSleArea','secSel','childSelect',opdata2);});
	$("#secSel").bind("change",function(){op.chan(true,true,'unionSleArea','thirdsel','childSelect',opdata3);});
	$("#thirdsel").bind("change",function(){op.chan(true,true,'unionSleArea','forthsel','childSelect',opdata4);});

 
    //tab切换 ， 点击切换_分享、阅读等等
    var tabItem=$(".projectTitleBor .projectName");
    tabItem.bind("click",function(){
        var i=$(this).index();
        $(this).parent().find(".projectName").removeClass("sel");
        $(this).addClass("sel");
        $(this).parent().parent().parent().find(".formItem-wrap").hide();
        $(this).parent().parent().parent().find(".formItem-wrap").eq(i).show();  
});



});

 
