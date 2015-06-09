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


});
    
