var app = require('express')();
var http = require('http').createServer(app);
const PORT = 8080;
var io = require('socket.io')(http);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', function (socket) {
    socket.emit('connection', 'connected to server');
    console.log('new client connected');
    socket.on('send-message', (data) => {
        // socket.emit('send-message-to-clients', data); //send to same one user only
        // io.emit('send-message-to-clients', data); //send to all users
        io.sockets.in(data.room).emit('send-message-to-clients', data); //send to same room users only
    })

    socket.on('joinRoom', (room) => {
        console.log('room joined: ' + room)
        socket.join(room) // it creats a room or a session for the particluar id 
    })

    socket.on('disconnect', (val) => {
        console.log(val)
    });
});