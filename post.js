
var TwitterPackage = require('twitter');
var fs = require('fs');

var consumer_secret = process.env.CONSUMER_SECRET;
var consumer_key = process.env.CONSUMER_KEY;
var access_token_key = process.env.ACCESS_TOKEN_KEY;
var access_token_secret = process.env.ACCESS_TOKEN_SECRET;

var secret = {
	consumer_secret: consumer_secret,
	consumer_key: consumer_key,
	access_token_key: access_token_key,
	access_token_secret: access_token_secret
}

var Twitter = new TwitterPackage(secret);

function getRandomLine(filename, callback) {
    var data = fs.readFileSync(filename, 'utf8');
    var lines = data.split("\n");
    var line_no = Math.floor(Math.random()*(lines.length-1));
    if(+line_no > lines.length){
      throw new Error('File end reached without finding line');
    }

    callback(lines[+line_no]);
}

function post(message){
 	Twitter.post('statuses/update', {status: message},  function(error, tweet, response){
       	if(error){
        	console.log(error);
        }
        console.log(tweet);  // Tweet body.
    });
}

if(process.argv.length>2){
	post(process.argv[2]);
}
else{
	console.log("no args");
	getRandomLine("./sentences", function(line){
		post(line);
	});
}
