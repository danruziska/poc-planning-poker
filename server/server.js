var http = require('http');
var io = require('socket.io');
var port = 3001;

var server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end('Websocket server is up and running!\n');    
});

server.listen(port, function(){
    console.log('server up at port ' + port);
});

var realtimeListener = io.listen(server);

var tableSocket;

realtimeListener.on('connection',function(socket){
    socket.on('table-connect', function(){
        tableSocket = socket;
    });

    socket.on('phone-throw-card', function(cardData){
        if(tableSocket){
            tableSocket.emit('phone-throw-card', cardData);
        }
    });
});