var spawn = require('child_process').spawn;

exports.create = function(req, res){
    var message = req.body;
    console.log("adding message: " + JSON.stringify(message));
    console.log('header: ' + JSON.stringify(req.headers));  
    var p = spawn('echo', [message.message]);
    p.stdout.on('data', function (data) {
	console.log('echo: ' + data);
    });
    res.send(message);
};
