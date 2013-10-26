var csv = require('csv')
  , fs = require('fs');

exports.findFeeds = function(f) {
  csv()
    .from.stream(fs.createReadStream('feeds.csv'))
    .on('record', function(row, index) {
      f({
	id : row[0],
	url : row[1],
	title : row[2]
      });
    });
}
