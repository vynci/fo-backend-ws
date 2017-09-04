var server = require('http').createServer();
var io = require('socket.io')(server);
var database = require("./database.js");
var SerialPort = require('serialport');

const Readline = SerialPort.parsers.Readline;

var port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
});

const parser = port.pipe(new Readline({ delimiter: '\n' }));

port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message);
  }	
});

parser.on('data', function(data){
	console.log(data);
	io.emit('fromPublicServer', data);
	database.store(data);  
});

server.listen(4444);
