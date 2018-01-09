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
    var li = $('<li></li>');
    li.addClass('listedRoom listedRoom-hover');
    li.text(`${rooms[i].name}`);
    $('#createdRooms').append(li);
  }
}

function updateUsersList(room) {
  $('#userlist').html('');
  for (var i in room.users) {
    //console.log(rooms[i]);
    var li = $('<li></li>');
    li.text(`${room.users[i]}`);
    $('#userlist').append(li);
  }
  $('#users-amount').text(room.users.length);
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

socket.on('sendUserList', function(room) {
    if (localStorage.getItem('room') === room.name) {
      updateUsersList(room);
    }
})

socket.on('NewUserJoined', (data) => {
  if (localStorage.getItem('room') === data.room) {
    var formattedTime = moment(data.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      text: data.text,
      from: 'Admin',
      createdAt: formattedTime
    });
    $('#messagelist').append(html);
    scrollToBottom();
  }
})

socket.on('sendWelcomeText', function(message) {
  console.log(message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messagelist').append(html);
  scrollToBottom();
  console.log('vastaanotettu serveriltä');
})

socket.on('newMessage', function(message) {
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
  console.log(localStorage.getItem('name').length);
  console.log(localStorage.getItem('room'));
  if (localStorage.getItem('name') == '' || localStorage.getItem('room').length == '') {
    logOut();
  } else if ($('#textArea').val() === '') {

  } else {
    socket.emit(
      'createMessage',
      {
        from: localStorage.getItem('name'),
        text: $('[name=message]').val(),
        room: localStorage.getItem('room')
      },
      function() {}
    );
  }
  $('#textArea').val('');
});

$('#createRoomForm').on('submit', function(e) {
  // e.preventDefault();
  // socket.emit('addRoom', {
  //   name: $('[name=roomName]').val(),
  //   password: $('[name=roomPassword]').val()
  // });
  //SIIRRETTY MODAL.JS:ään
});
