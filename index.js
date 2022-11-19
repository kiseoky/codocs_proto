const server = require('http').createServer();
const io = require('socket.io')(server, {  
    cors: {
    origin: "*",
    methods: ["GET", "POST"]
    }
});
io.on('connection', client => {
  client.on('data', data => { 
    client.broadcast.emit('data', data)
   });
  client.on('disconnect', () => { /* … */ });
});
server.listen(3001);
