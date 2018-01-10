var socket = io();

$(document).ready(function() {
  $(
    '#createRoomForm, #createdRoomsContainer, #roomSelected, #chooseNameForm, #feedback, #container'
  ).removeClass('hidden');
});

$(
  '#createRoomForm, #chooseNameForm, #createdRoomsContainer, #roomCreatedMessage, #feedback *, #roomSelected'
).hide();

// $('#modal').modal('hide');

//nappi pois käytöstä
$('#chooseRoom-button, #CreateRoom-button').prop('disabled', true);

clearFields();

function clearInputBackground() {
  $('#roomName, #roomPassword, #roomPasswordAgain, #username').css(
    'background',
    ''
  );
  $('#roomName, #roomPassword, #roomPasswordAgain, #username').css(
    'background-size',
    ''
  );
  $('#roomName, #roomPassword, #roomPasswordAgain, #username').css(
    'background-origin',
    ''
  );
}

function clearFields() {
  $(
    '#roomName, #roomPassword, #roomPasswordAgain, #username, #passwordRequired'
  ).val('');
}

function removeHtmlTags(fieldId) {
  var value = fieldId.val();
  var checked = value.replace(/(<([^>]+)>)/gi, '');
  if (value != checked) {
    clearFeedback();
    var feedback = $('#htmlRemoved');
    roomFeedback(feedback);
  }
  return checked;
}

function removeSpaces(fieldId) {
  var value = fieldId;
  var checked = value.replace(/\s/g, '');
  if (value != checked) {
    clearFeedback();
    var feedback = $('#spacesRemoved');
    roomFeedback(feedback);
  }
  return checked;
}

function roomFeedback(feedback) {
  var feedback = feedback;
  $('#feedback *').clearQueue();
  feedback.fadeIn(150);
  feedback.delay(5000).fadeOut(150);
}

function clearFeedback() {
  $('#feedback *').clearQueue();
  $('#feedback *').hide();
}

socket.on('passwordResult', result => {
  console.log(result);
  if (result === true) {
    $('#roomSelected').fadeOut(150);
    clearFeedback();
    clearFields();
    $('#chooseNameForm')
      .delay(150)
      .fadeIn(150);
    //$('#modal').modal('toggle');
  } else if (result === false) {
    clearFeedback();
    clearFields();
    $('#wrong-password').fadeIn(150);
    $('#wrong-password')
      .delay(5000)
      .fadeOut(150);
  }
});

//modalin piilotus. Huoneeseen liittyminen
$('#chooseRoom-button').click(function() {
  socket.emit('checkPassword', {
    name: $('#roomSelected p:first').text(),
    password: $('#passwordRequired').val()
  });
  /*
    /$('#roomSelected').fadeOut(150);
    if(getCookie('userID') == undefined ){
      clearFields();
      $('#chooseNameForm').delay(150).fadeIn(150);
    } else {
      $('#modal').modal('toggle');
    }  */
  $('#back-arrow').addClass('invisible');
  $('#choosename-button').prop('disabled', true);
});

$('#createRoom').click(function() {
  clearFeedback();
  $('#createRoomForm')
    .delay(150)
    .fadeIn(150);
  $('#back-arrow').removeClass('invisible');
  $(
    '#createRoom, #EnterRoom, #feedback div, #feedback div, #dismiss-glyphicon'
  ).fadeOut(150);
  clearFields();
  $('#CreateRoom-button').prop('disabled', true);
});

// $('#createRoom').on('click', function() {
//   clearFeedback();
//   $('#createRoomForm')
//     .delay(150)
//     .fadeIn(150);
//   $('#back-arrow').removeClass('invisible');
//   $(
//     '#createRoom, #EnterRoom, #feedback div, #feedback div, #dismiss-glyphicon'
//   ).fadeOut(150);
//   clearFields();
//   $('#CreateRoom-button').prop('disabled', true);
// });

//back
$('#back-arrow').click(function() {
  clearFeedback();
  $(
    '#createRoomForm, #chooseNameForm, #createdRoomsContainer, #roomSelected'
  ).fadeOut(150);
  $('#createRoom, #EnterRoom')
    .delay(150)
    .fadeIn(150);
  $('ul li').removeClass('roomSelected');
  $('#chooseRoom-button, #CreateRoom-button, #choosename-button').prop(
    'disabled',
    true
  );
  clearInputBackground();
  $('#back-arrow').addClass('invisible');
});
//enter room -valikkoon
$('#EnterRoom').click(function() {
  clearFeedback();
  clearFields();
  $(
    '#createRoom, #EnterRoom, #feedback div, #feedback div *, #dismiss-glyphicon'
  ).fadeOut(150);
  // $('#chooseNameForm')
  //   .delay(150)
  //   .fadeIn(150);
  //$('#createdRoomsContainer').delay(150).fadeIn(150);
  // if (getCookie('userID') == undefined) {
  //   $('#chooseNameForm')
  //     .delay(150)
  //     .fadeIn(150);
  // } else {
  $('#createdRoomsContainer')
    .delay(150)
    .fadeIn(150);
  // }
  $('.roomSelected').removeClass('roomSelected');
  $('#back-arrow').removeClass('invisible');
});
//huoneen luonti
$('#CreateRoom-button').click(function(e) {
  e.preventDefault();
  socket.emit('addRoom', {
    name: $('[name=roomName]').val(),
    password: $('[name=roomPassword]').val()
  });
  socket.emit('listRooms');
  room = undefined;
  clearFeedback();
  room = $('#roomName').val();
  $('#createdRoom').html(room);
  $('#createdRoom').hide();
  $('#CreateRoom-button').prop('disabled', true);
  $('#createRoomForm').fadeOut(150);
  $('#back-arrow').addClass('invisible');
  $('#createRoom, #EnterRoom')
    .delay(150)
    .fadeIn(150);
  $('#feedback div, #feedback div *, #dismiss-glyphicon')
    .delay(450)
    .fadeIn(150);
  //$('#feedback div, #feedback div').delay(10000).fadeOut(150);
  clearFields();
  clearInputBackground();
});

$('#dismiss-glyphicon').click(function() {
  $('#feedback div, #feedback div *, #dismiss-glyphicon').fadeOut(150);
});

$('#enter-now-button').click(function() {
  console.log($('#createdRoom').text());
  localStorage.setItem('room', $('#createdRoom').text());
  $(
    '#createRoom, #EnterRoom, #feedback div, #feedback div *, #dismiss-glyphicon'
  ).fadeOut(150);
  $('#chooseNameForm')
    .delay(150)
    .fadeIn(150);
  $('#createdRoom').toggleClass('roomSelected');
  var createdRoom = $('#createdRoom').html();
  $('#roomSelected p').html(createdRoom);
  $('#chooseRoom-button').prop('disabled', false);
});

//huoneen valinta -hover
/*
$('ul li').on( "click", function() {
    if ($('ul li').hasClass('roomSelected')) {
        $('ul li').removeClass('roomSelected');
        $('ul li').addClass('listedRoom-hover');
    }
    $(this).toggleClass('roomSelected');
    $(this).removeClass('listedRoom-hover');
    $('#chooseRoom-button').prop('disabled', false);
}); */

//huoneen valinta
$('#createdRooms').on('click', '.listedRoom', function() {
  localStorage.setItem('room', $(this).text());
  $(this).toggleClass('roomSelected');
  $(this).removeClass('listedRoom-hover');
  $('#chooseRoom-button').prop('disabled', false);
  $('#createdRoomsContainer').fadeOut(150);
  $('#roomSelected')
    .delay(150)
    .fadeIn(150);
  var str = $(this).text();
  $('#roomSelected p').html(str);
  $('#back-arrow').addClass('invisible');
  //$('#passwordRequired').text()
});

$('#backToListing').click(function() {
  clearFeedback();
  $('#roomSelected').fadeOut(150);
  $('#createdRoomsContainer')
    .delay(150)
    .fadeIn(150);
  if ($('ul li').hasClass('roomSelected')) {
    $('ul li').removeClass('roomSelected');
    $('ul li').addClass('listedRoom-hover');
  }
  $('#back-arrow').removeClass('invisible');
});

//estää default submiting
$('#createRoomForm,#chooseNameForm').submit(function(e) {
  e.preventDefault();
});

//virheilmoitus
$('#roomName').keyup(function() {
  var value = $('#roomName');
  var checkedHtml = removeHtmlTags(value);
  var checked = removeSpaces(checkedHtml);
  $('#roomName').val(checked);
  if ($('#roomName').val().length < 1) {
    $('#roomName').css('background', '');
    $('#roomName').css('background-size', '');
    $('#roomName').css('background-origin', '');
  } else if (
    $('#roomName').val().length >= 1 &&
    $('#roomName').val().length < 4
  ) {
    $('#CreateRoom-button').prop('disabled', true);
    $('#roomName').css(
      'background',
      'rgb(213,220,237) url(images/error.png) right no-repeat'
    );
    $('#roomName').css('background-size', '18px 18px');
    $('#roomName').css('background-origin', 'content-box');
  } else {
    $('#roomName').css(
      'background',
      'rgb(213,220,237) url(images/success.png) right no-repeat'
    );
    $('#roomName').css('background-size', '23px 23px');
    $('#roomName').css('background-origin', 'content-box');
    clearFeedback();
  }
});

$('#roomName').focusout(function() {
  if ($('#roomName').val().length < 4 && $('#roomName').val().length > 0) {
    clearFeedback();
    $('#short-roomName').fadeIn(150);
    $('#short-roomName')
      .delay(5000)
      .fadeOut(150);
  }
});
//virheilmoitus
$('#roomPassword').keyup(function() {
  var value = $('#roomPassword');
  var checkedHtml = removeHtmlTags(value);
  var checked = removeSpaces(checkedHtml);
  $('#roomPassword').val(checked);
  if ($('#roomPassword').val().length < 1) {
    $('#CreateRoom-button').prop('disabled', true);
    $('#roomPassword').css('background', '');
    $('#roomPassword').css('background-size', '');
    $('#roomPassword').css('background-origin', '');
  } else if (
    $('#roomPassword').val().length >= 1 &&
    $('#roomPassword').val().length < 6
  ) {
    $('#roomPassword').css(
      'background',
      'rgb(213,220,237) url(images/error.png) right no-repeat'
    );
    $('#roomPassword').css('background-size', '18px 18px');
    $('#roomPassword').css('background-origin', 'content-box');
  } else {
    $('#roomPassword').css(
      'background',
      'rgb(213,220,237) url(images/success.png) right no-repeat'
    );
    $('#roomPassword').css('background-size', '23px 23px');
    $('#roomPassword').css('background-origin', 'content-box');
    clearFeedback();
  }
});

$('#roomPassword').focusout(function() {
  if (
    $('#roomPassword').val().length <= 5 &&
    $('#roomPassword').val().length > 0
  ) {
    clearFeedback();
    $('#short-password').fadeIn(150);
    $('#short-password')
      .delay(5000)
      .fadeOut(150);
  }
});
//virheilmoitus, nappi käyttöön
$('#roomName, #roomPasswordAgain, #roomPassword').keyup(function() {
  var value = $('#roomPasswordAgain');
  var checkedHtml = removeHtmlTags(value);
  var checked = removeSpaces(checkedHtml);
  $('#roomPasswordAgain').val(checked);
  if (
    $('#roomName').val().length >= 4 &&
    $('#roomPassword').val().length >= 5 &&
    $('#roomPassword').val() == $('#roomPasswordAgain').val()
  ) {
    $('#CreateRoom-button').prop('disabled', false);
    $('#roomPasswordAgain').css(
      'background',
      'rgb(213,220,237) url(images/success.png) right no-repeat'
    );
    $('#roomPasswordAgain').css('background-size', '23px 23px');
    $('#roomPasswordAgain').css('background-origin', 'content-box');
  } else if ($('#roomPasswordAgain').val().length < 1) {
    $('#CreateRoom-button').prop('disabled', true);
    $('#roomPasswordAgain').css('background', '');
    $('#roomPasswordAgain').css('background-size', '');
    $('#roomPasswordAgain').css('background-origin', '');
  } else {
    $('#CreateRoom-button').prop('disabled', true);
    $('#roomPasswordAgain').css(
      'background',
      'rgb(213,220,237) url(images/error.png) right no-repeat'
    );
    $('#roomPasswordAgain').css('background-size', '18px 18px');
    $('#roomPasswordAgain').css('background-origin', 'content-box');
  }
});

$('#username').keyup(function() {
  var value = $('#username');
  var checkedHtml = removeHtmlTags(value);
  var checked = removeSpaces(checkedHtml);
  $('#username').val(checked);
  if ($('#username').val().length >= 3) {
    $('#choosename-button').prop('disabled', false);
    $('#username').css(
      'background',
      'rgb(213,220,237) url(images/success.png) right no-repeat'
    );
    $('#username').css('background-size', '23px 23px');
    $('#username').css('background-origin', 'content-box');
  } else if ($('#username').val().length < 1) {
    $('#choosename-button').prop('disabled', true);
    clearInputBackground();
  } else {
    $('#choosename-button').prop('disabled', true);
    $('#username').css(
      'background',
      'rgb(213,220,237) url(images/error.png) right no-repeat'
    );
    $('#username').css('background-size', '18px 18px');
    $('#username').css('background-origin', 'content-box');
  }
});
//huoneiden listaus
$('#choosename-button').click(function() {
  localStorage.setItem('name', $('#username').val());
  socket.emit('nameSelected', {
    username: $('#username').val(),
    roomname: localStorage.getItem('room')
  });
  socket.emit('refreshUsers', localStorage.getItem('room'));
  socket.emit('newUser', {
    user: localStorage.getItem('name'),
    room: localStorage.getItem('room')
  });
  socket.emit('welcomeText');
  clearFeedback();
  $('#chooseNameForm').fadeOut(150);
  $('#modal')
    .delay(150)
    .modal('hide');
});

//Huoneen hakeminen
$('#roomSearch').keyup(function() {
  var search = $('#roomSearch').val();
  $('.listedRoom').each(function() {
    var room = $(this).text();
    if (room.includes(search) == false) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
});

$('#logout').click(function() {
  $('#modal').modal('show');
  $('#menuBtn').removeClass('pressed');
  $('#users').removeClass('users-pressed');
  $('#logout, #download, #group-users').hide();
  $('#messagelist').show();
  $('#createRoom, #EnterRoom').fadeIn(150);
  socket.emit('leaveRoom', {
    user: localStorage.getItem('name'),
    room: localStorage.getItem('room')
  });
  localStorage.setItem('name', '');
  localStorage.setItem('room', '');
});

//Jos huonelista tyhjä
/*if ($.trim($('div ul').html()) == "")) {
  $(this).append("<li>No Rooms to enter</li>");

} */
