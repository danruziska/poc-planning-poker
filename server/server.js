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

realtimeListener.on('connection',function(socket){
    socket.on('room', function(roomId){
        console.log('evento room recebido pelo cliente');
        socket.join(roomId);
    });



    socket.on('join-room', function(userData, roomId){
        if(socket){
            console.log('emitindo evento user-joined para a sala: ' + roomId);
            realtimeListener.in(roomId).emit('user-joined', userData);
        }
    });
});