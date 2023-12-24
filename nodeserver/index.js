//Node Server that will handle socket io Connections
const io = require('socket.io')(8000,{cors:{origin:"*"}});

users = {}

io.on('connection', socket => {
    socket.on('new-user-joined',name => {
        // console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        io.emit('user-count-update', Object.keys(users).length);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
        io.emit('user-count-update', Object.keys(users).length);
    });

    socket.on('typing', () => {
        socket.broadcast.emit('user-typing', users[socket.id]);
    });
    
    socket.on('stop-typing', () => {
        socket.broadcast.emit('user-stop-typing');
    });
})