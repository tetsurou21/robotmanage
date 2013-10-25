$(document).ready(
  function() {
    $('#form').submit(
      function() {
	var message = $('#message');
	$.post(
	  'posts',
	  {
	    'message': message.val()
	  },
	  function (data) {
	    var date = new Date();
	    $('#messages').prepend("<dt>" + date + "</dt><dd>" + data.message + "</dd>");
	  }
	);
	return false;
      }
    );
  }
);
