
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

function retweet(id){
	Twitter.post("statuses/retweet/"+id, {}, function(error, tweet, response){
	if(error){console.log(error);}
	console.log(response);
}); 
}

var Twitter = new TwitterPackage(secret);

Twitter.get("search/tweets", {q: 'internship cybersecurity', count: 0}, function(error, tweet, response){
	if(error){
		console.log(error);
	}
	retweet(tweet.statuses[0].id_str);	
});
