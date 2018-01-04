$(function() {  
    $(".scrollable").niceScroll();
});


$('#group-users').hide();

$(".scrollable").mouseover(function() {
    $(this).getNiceScroll().resize();
    $(this).delay(500).getNiceScroll().show();
            
}); 