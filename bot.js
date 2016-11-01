
var TwitterPackage = require('twitter');
var fs = require('fs');

var secret = {
  consumer_secret: 'uA4LdGvgW7vf70IncROG8xEW9DYGSnLq8SygetUtUc30809gzT',
  consumer_key: 'qJV157rDGUVkbExLQYxajW6WS',
  access_token_key: '1890721880-L2EQX6vYX5vNfKr5zFE06gzU39T4cDhhiJAvAV2',
  access_token_secret: 'eGIM1xbOzqIMgMwGJT2F5p16N4ZlOVNpvwcP4NxMgqtP4'
}
var Twitter = new TwitterPackage(secret);

function getRandomLine(filename, callback) {
    var data = fs.readFileSync(filename, 'utf8');
    var lines = data.split("\n");
    var line_no = Math.floor(Math.random()*lines.length);
    if(+line_no > lines.length){
      throw new Error('File end reached without finding line');
    }

    callback(lines[+line_no]);
}

getRandomLine("./sentences", function(line){

	console.log("line="+line);
	Twitter.post('statuses/update', {status: line},  function(error, tweet, response){
  		if(error){
    			console.log(error);
	  	}
 		console.log(tweet);  // Tweet body.
  		console.log(response);  // Raw response object.
	});
});

