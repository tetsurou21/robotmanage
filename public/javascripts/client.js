$(document).ready(
  function() {
    var ws = new WebSocket("ws://localhost:3000/");
    ws.onmessage = function(event) {
      var data = JSON.parse(event.data);
      var date = new Date();
      var message = data.user + ': ' + data.message;
      $('#messages').prepend("<dt>" + date + "</dt><dd>" + 
			     message + "</dd>");
    };

    $('#form').submit(
      function() {
	var message = $('#message');

	ws.send(JSON.stringify({
	  'user': 'anonymous',
	  'message': message.val()
	}));

	return false;
      }
    );
  }
);

