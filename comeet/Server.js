
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

//Datenbankverbindung vorbereiten
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'Comeet'
});

//DB Verbindung herstellen
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});
//connection.end();

//Server app
var app = express();

//Formular POST Handling
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.urlencoded({ extended : true }));  //für Formulardaten
app.use(express.static('.tmp'));  //static ist ein helper, der liefert zeugs aus dem angegeben oderner aus

app.post('/tische', function(req, res) {

//    die function(req, res) { handler können als dritten paramater ein next entgegen nehmen
//    das ist so ne art error handler
//    den dann einfach mit next(err) aufrufen
//    und scho ist der error im client

    if (req.body.tischID) {
        Tisch_ID = req.body.tischID;
    }

    var Gerichtarten = [];

    connection.query('SELECT Gerichtart FROM Gerichte WHERE inSpeisekarte = 1 and verfügbar = 1 GROUP BY Gerichtart', function(err, rows, fields) {
        if (!err) {

            Array.prototype.forEach.call(rows, function (el, idx) {
                Gerichtarten.push(rows[idx].Gerichtart);
                //console.log(rows[idx]);
            });
        }
        else {
            console.log('Da hat was nicht geklappt, bitte Server neu starten, Seite neu laden und nochmal versuchen');

        }

        res.status(200);
        res.end(JSON.stringify(Gerichtarten));
    });
});

var server = app.listen(8080);