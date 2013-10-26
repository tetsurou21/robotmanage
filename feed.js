var FeedParser = require('feedparser'),
request = require('request'),
WebSocket = require('ws');

var ws = new WebSocket('ws://localhost:3000');

request('http://b.hatena.ne.jp/hotentry.rss')
  .pipe(new FeedParser())
  .on('readable', function () {
    var stream = this, item;
    while (item = stream.read()) {
      var jstr = JSON.stringify({
	user: 'フィード',
	message: item.title
      });

      ws.send(jstr);
    }
  })
  .on('end', function() {
    ws.terminate();
  });

