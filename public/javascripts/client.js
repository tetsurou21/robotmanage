$(document).ready(
  function() {
    var userName = 'guest' + Math.floor(Math.random() * 100);
    $('#user-name').append(userName);

    var ws = new WebSocket("ws://localhost:3000/");   
    ws.onmessage = function(event) {
      var data = JSON.parse(event.data);
      var message = data.user + ': ' + data.message;
      $('#messages').prepend(
	"<dt>" + data.date + "</dt><dd>" + 
	  message + "</dd>"
      );
    };

    $('#form').submit(
      function() {
	var message = $('#message');

	ws.send(JSON.stringify({
	  'user': userName,
	  'message': message.val()
	}));

	return false;
      }
    );
  }
);

