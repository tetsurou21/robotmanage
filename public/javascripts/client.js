$(document).ready(
  function() {
    $('#form').submit(
      function() {
	var message = $('#message');
	$.post(
	  'posts',
	  {
	    'user': 'anonymous',
	    'message': message.val()
	  },
	  function (data) {
	    var date = new Date();
	    var message = data.user + ': ' + data.message;
	    $('#messages').prepend("<dt>" + date + "</dt><dd>" + 
				   message + "</dd>");
	  }
	);
	return false;
      }
    );
  }
);
