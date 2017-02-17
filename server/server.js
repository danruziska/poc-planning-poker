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
    socket.on('user-joined', function(userData, roomId){
        socket.join(roomId);
        if(socket){
            realtimeListener.in(roomId).emit('user-joined', userData);
        }
    });
});