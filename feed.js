var FeedParser = require('feedparser')
  , request = require('request')
  , WebSocket = require('ws')
  , csv = require('csv')
  , fs = require('fs');

var ws = new WebSocket('ws://localhost:3000');

csv()
  .from.stream(fs.createReadStream('feeds.csv'))
  .on('record', function(row, index) {
    var id = row[0];
    var url = row[1];
    var title = row[2];
    request(url)
      .pipe(new FeedParser())
      .on('meta', function(meta) {
	feedTitle = meta.title;
      })
      .on('readable', function () {
	var stream = this, item;
	while (item = stream.read()) {
	  var jstr = JSON.stringify({
	    type: 'feed',
	    user: title,
	    message: item.title
	  });
	  
	  ws.send(jstr);
	}
      })
      .on('end', function() {
	ws.terminate();
      });
  });
