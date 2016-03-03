tbSelect = function(screen, settings) { //screen:{1:"role1",2:"role2",3:"role3"}设置筛选条件
    var my = this,
        x;
    my.screen = screen;
    my.loadUrl = function(sel) { //sel:{1:11,2:22,3:33}设置筛选条件 注意：sel跟screen是一一对应的筛选条件
        var addUrl = '';
        for (x in sel) {            
            addUrl += "/" + my.screen[x] + "/" + sel[x]
        }
        window.location.href = window.location.host + addUrl;
    };
    my.init=function(){
         my.loadUrl({1:11,2:22,3:33});
    };

}; 