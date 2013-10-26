var FeedParser = require('feedparser')
  , request = require('request')
  , WebSocket = require('ws')
  , csvfeed = require('./lib/csvfeed');

var ws = new WebSocket('ws://localhost:3000');

csvfeed.findFeeds(
  function(feed) {
    request(feed.url)
      .pipe(new FeedParser())
      .on('readable', function () {
	var stream = this, item;
	while (item = stream.read()) {
	  var jstr = JSON.stringify({
	    type: 'feed',
	    user: feed.title,
	    message: item.title
	  });
	  
	  ws.send(jstr);
	}
      })
      .on('end', function() {
	ws.terminate();
      });
  });
