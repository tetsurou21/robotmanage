var FeedParser = require('feedparser'),
request = require('request'),
WebSocket = require('ws');

var ws = new WebSocket('ws://localhost:3000');
var feedTitle;

request('http://feeds.reuters.com/reuters/topNews')
  .pipe(new FeedParser())
  .on('meta', function(meta) {
    feedTitle = meta.title;
  })
  .on('readable', function () {
    var stream = this, item;
    while (item = stream.read()) {
      var jstr = JSON.stringify({
	type: 'feed',
	user: feedTitle,
	message: item.title
      });

      ws.send(jstr);
    }
  })
  .on('end', function() {
    ws.terminate();
  });

