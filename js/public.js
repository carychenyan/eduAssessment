$(function(){
  
   //菜单下拉
   $(".nav ul>li").hover(function(){ 
          $(this).find("span").css("display","block");
          $(this).find(".secUl").css("display","block");
      },function(){
         $(this).find("span").css("display","none");
         $(this).find(".secUl").css("display","none");
      }
   );

});
    
