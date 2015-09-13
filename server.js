var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');
var app = express();

//static
app.use(express.static(__dirname + '/src/'));

var mongo = require('mongoskin');

var db = mongo.db("mongodb://localhost:27017/tomorrowworld", {native_parser:true});
db.bind('msgs');

var jsonParser = bodyParser.json()

app.get('/', function(req, res) {
	res.sendFile('./src/index.html');
});

app.post('/api/store_msg', jsonParser, function(req, res) {
	if (req.body.msg != {}) {
		db.msgs.insert({msg : req.body.msg}, function() {
			res.end('Msg added');
		});
	}
});

app.get('/api/get_msg', function(req, res) {
	db.msgs.find().toArray(function(err, items) {
		res.send(items[Math.floor(Math.random()*items.length)]);
	});
});

//create server
var server = app.listen(8000, function () {
	var host = "127.0.0.1";
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
