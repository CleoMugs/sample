var express = require('express');
var app = express();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db/comment.db');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));


//routes
app.get('/', function(request, response){
	response.send('Helllo, World');
});

app.get('/comments', function(request, response){
	console.log('GET request received at /comments');
	db.all('SELECT * FROM comment', function(err, rows){
		if (err) {
			console.log('Error:' + err);
		}else{
			response.send(rows);
		}
	})
});

app.post('/comments', function(request, response){
	console.log('POST request received at /comments');
	db.run('INSERT INTO comment VALUES(?, ?)',
	[request.body.name, request.body.comment], function(err){
		if(err){
			console.log('Error' + err);
		}else{
			response.status(200).redirect('demo.html');
		}
	});
});


app.listen(3000, function(){
	console.log("Server is running on port 3000");
});