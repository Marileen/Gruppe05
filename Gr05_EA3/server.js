// Der erste Versuch war es NUR mit Node zu machen
// Aber dann haben wir doch zumindenst express eingesetzt
// um das Routing und Breitstellen von statischen Dateien
// etwas einfacher zu haben

	// var http = require('http');

	// var server = http.createServer(function(req,res) {
	// 	res.writeHead(200);
	// 	res.end('Yo');

	// 	req.on('data', function(chunk) {
	// 		console.log(chunk);
	// 	});
	// });

	// server.listen(8080);


var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs'); //node module

var app = express();

app.use(bodyParser.json()); //falls wir mal json verarbeiten wollen ;)
app.use(bodyParser.urlencoded({ extended : true }));  //für Formulardaten
app.use(express.static('app'));  //static ist ein helper, der liefert zeugs aus dem angegeben oderner aus

//Inhalt aus Datei kommt als string und dann machen wir json draus
var rezeptDB = JSON.parse(fs.readFileSync('rezeptDB.json')); 

app.post('/rezept', function(req, res) {

	//req.body haben wir jetzt vom bodyParser

	rezeptDB.push(req.body); //neue daten hinzufügen 
	var rezeptData = JSON.stringify(rezeptDB, null, '  '); //umwandeln für writeFile weil das einen String haben möchte

	//json doc was die geparsen daten aus dem html doc, also was es geschickt hat enthält
	fs.writeFile('rezeptDB.json', rezeptData);

	res.end(rezeptData);
});

var server = app.listen(8080);