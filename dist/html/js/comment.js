jQuery(function(a){a("div[name='get_comment_list']").get_comment_list()}),jQuery.fn.extend({get_comment_list:function(){var a=this,b=$(a).attr("comment_type"),c=$(a).attr("comment_type_id");$.get(commonParams.dodoYanxiuPath+"/Comment/commentList",{comment_type:b,comment_type_id:c},function(b){$(a).html(b)})},get_comment_page_list:function(){$(this).die().live("click",function(a){a.preventDefault();var b=this,c=$(b).attr("href"),d=$("div[name='get_comment_list']").attr("comment_type"),e=$("div[name='get_comment_list']").attr("comment_type_id"),f=$("div[name='get_comment_list']").attr("comment_number")?$("div[name='get_comment_list']").attr("comment_number"):"0";$.get(commonParams.dodoYanxiuPath+c,{comment_type:d,comment_type_id:e,comment_number:f},function(a){$("div[name='get_comment_list']").html(a)})})},add_comment:function(){$(this).die().live("click",function(){var comment_type=$("div[name='get_comment_list']").attr("comment_type"),comment_type_id=$("div[name='get_comment_list']").attr("comment_type_id"),comment_content=$("textarea[name='comment_content']").val(),datas="";return 0==$.trim(comment_content).length?(promptMessageDialog({icon:"warning",content:"内容不能为空!",time:1e3}),!1):void $.get(commonParams.dodoYanxiuPath+"/Comment/addComment",{comment_type:comment_type,comment_type_id:comment_type_id,comment_content:comment_content},function(data){try{datas=eval("("+data+")")}catch(e){datas=data}return"login"==datas.type?(loginDialog(),!1):"error"==datas.type?(promptMessageDialog({icon:"warning",content:"添加失败!",time:1e3}),!1):(promptMessageDialog({icon:"finish",content:"添加成功!",time:1e3}),$("div[name='all_comment']").find("ul").prepend(datas.data),$("textarea[name='comment_content']").val(""),void 0)})})},delete_comment:function(){$(this).die().live("click",function(){var that=this,comment_id=$(that).attr("val"),datas="";$.get(commonParams.dodoYanxiuPath+"/Comment/deleteComment",{comment_id:comment_id},function(data){try{datas=eval("("+data+")")}catch(e){datas=data}return"error"==datas.type?(promptMessageDialog({icon:"warning",content:"删除失败!",time:1e3}),!1):void $(that).parent().parent().remove()})})}}),$("div[name='page']").find("a").get_comment_page_list(),$("div[name='add_comment']").add_comment(),$("a[name='del_comment']").delete_comment();