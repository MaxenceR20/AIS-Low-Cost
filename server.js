const express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pecheurs"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  });
function insertbdd()
{
var sql = "INSERT INTO pecheurs (Nom, DEVEUI, Position) VALUES ('Max', '48', '48.444	4.88')";
con.query(sql, function (err, result) {
if (err) throw err;
console.log("1 record inserted");
  });
}




app.use(express.static('public'));


app.get("/setdata",function(req, res){
//    res.writeHead(200, {'Content-Type': 'text/plain'});
    
//  	res.end('Hello World!');
  	var lat = req.query.lat
  	var long = req.query.long
  	var etat = req.query.etat
  	var mmsi = req.query.mmsi
    console.log("lat,long,etat,mmsi : " +lat+";"+long+";"+etat+";"+mmsi);
  	io.emit('pos_gps', lat+";"+long+";"+etat+";"+mmsi);
  	
})

/*
io.on('connection', function(socket){
    console.log('a user is connected');
    socket.on('disconnect', function (){
        console.log('a user is disconnected');
    })
    socket.on('chat message', function (msg){
        console.log('message recu : ' + msg);
        io.emit('chat message', msg);
    })

})
*/
http.listen(8080, function(){
    console.log("Server running on 8080")
})
