$('#form').submit(
    function() {
	var message = $('#message');
	$.post('posts', 
	       {
		   'message': 'hoge'
	       }
	      );
    }
);

