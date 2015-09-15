 // placeholder ie6-8 debug plugin
    $(function(){
    if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.css("color","#000000");
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.css("color","#bbbbbb");
                input.val(input.attr('placeholder'));
            }
        }).blur();
    };
    })
    function placeholderSupport() {
        return 'placeholder' in document.createElement('input');
    }
// placeholder ie6-8 debug plugin