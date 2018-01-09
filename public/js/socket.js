var socket = io();

function scrollToBottom() {
  var messages = $('#chat-area');
  var messagelist = $('#messagelist');
  var newMessage = messagelist.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

function updateRoomsList(rooms) {
  $('#createdRooms').html('');
  for (var i in rooms) {
    //console.log(rooms[i]);
    var li = $('<li></li>');
    li.addClass('listedRoom listedRoom-hover');
    li.text(`${rooms[i].name}`);
    $('#createdRooms').append(li);
  }
}

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnedted from server');
});

socket.on('listRooms', function(rooms) {
  console.log('rooms list', rooms);
  updateRoomsList(rooms);
});

socket.on('newMessage', function(message) {
  console.log(message.room);
  console.log(localStorage.getItem('room'))
  if (message.room === localStorage.getItem('room')) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });
    $('#messagelist').append(html);
    scrollToBottom();
  }

});

$('#sendMessage').on('submit', function(e) {
  e.preventDefault();

  socket.emit(
    'createMessage',
    {
      from: localStorage.getItem('name'),
      text: $('[name=message]').val(),
      room: localStorage.getItem('room')
    },
    function() {}
  );
});

$('#createRoomForm').on('submit', function(e) {
  // e.preventDefault();
  // socket.emit('addRoom', {
  //   name: $('[name=roomName]').val(),
  //   password: $('[name=roomPassword]').val()
  // });
  //SIIRRETTY MODAL.JS:ään
});
