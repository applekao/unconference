var Keys = require('./keys.js')();
var Stream = require('node-tweet-stream');

var app = require('express')();
var server = require('http').Server(app);

var io =require('socket.io')(server);

var stream = new Stream({
	consumer_key:Keys.consumer_key,
	consumer_secret:Keys.consumer_secret,
	token:Keys.access_token_key,
	token_secret:Keys.access_token_secret
});

app.get('/',function(req, res){
	io.on('connection', function (socket){
		stream.on('tweet',function (tweet){
			console.log(tweet);
			socket.emit('tweet',{tweet:tweet})
		// console.log(tweet);	
		})
	})
	res.sendFile(__dirname+"/views/index.html");
	// eval(require('locus'));
});
stream.track('taiwan');

server.listen(3000);