var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');



var app = express();
var PORT = process.env.PORT || 3000;


app.get('/', function(req, res) {
	res.send('News API');
});


app.get('/news', function(req, res){
	db.news.findAll().then(function(news){
		res.json(todos);
	}, function (e){
		res.status(500).send();
	})
});

app.post('/news', function (req, res){
	var body = _.pick(req.body, 'title', 'description');

	db.news.create(body).then(function(data) {
		res.json(data.toJSON());	
	}, function(e) {
		res.status(400).json(e);
	});
});


db.sequelize.sync({force: true}).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});