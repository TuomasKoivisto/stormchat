var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnedted from server');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messagelist').append(li);
});

$('#sendMessage').on('submit', function(e) {
  e.preventDefault();

  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: $('[name=message]').val()
    },
    function() {}
  );
});
