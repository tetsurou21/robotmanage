$(document).ready(
  function() {
    var userName = 'ゲスト' + Math.floor(Math.random() * 100);
    $('#user-name').append(userName);

    var ws = new WebSocket("ws://localhost:3000/");   
    ws.onmessage = function(event) {
      var data = JSON.parse(event.data);
      var item = $('<li/>').append(
	$('<div/>').append(
	  $('<i/>').addClass('icon-user'),
	  data.user,
	  $('<small/>').addClass('meta chat-time').append(data.date),
	  $('<div/>').append(data.message)
	)
      ).addClass('well well-small');
      $('#messages').prepend(item).hide().fadeIn(500);
    };

    $('#message').keydown(function(event) {
      if (event.keyCode !== 13 || $('#message').val().length <= 0) {
	return true;
      }
      var message = $('#message');

      ws.send(JSON.stringify({
	'user': userName,
	'message': message.val()
      }));

      return false;      
    });
  }
);

