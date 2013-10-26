var FeedParser = require('feedparser')
, request = require('request');

request('http://b.hatena.ne.jp/hotentry.rss')
  .pipe(new FeedParser())
  .on('readable', function () {
    var stream = this, item;
    while (item = stream.read()) {
      var jstr = JSON.stringify({
	user: 'feed',
	message: item.title
      });

      console.log('jstr: ' + jstr);

      request({
      	'uri': 'http://localhost:3000/posts',
      	'method': 'POST',
      	'body': jstr,
      	'headers': {
      	  'Content-Type': 'application/json'
      	}
      });
    }
  })
