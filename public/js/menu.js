$('#logout, #download').hide();

$('#menuBtn').click(function() {
    $(this).toggleClass('pressed');
    $('#logout, #download').fadeToggle(200);
});

$('#users').click(function() {
    $(this).toggleClass('users-pressed');
    if (!$(this).hasClass('users-pressed')) {
      $('#group-users').fadeOut(150);
      $('#messagelist').delay(150).fadeIn(150);
    } else {
      $('#messagelist').fadeOut(150);
      $('#group-users').delay(150).fadeIn(150);
    }
})
