const app = require('express')();
const http = require('http').createServer(app);
const io = require("socket.io")(http, {
	cors: {
		origins: [
			"http://localhost:3001",
			"http://localhost:4200",
			"http://localhost:8080",
      "http://localhost:8081",
		],
	},
});

let users = [];
let messages = [];

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io reset</h1>');
});

io.on('connection', (socket) => {

  socket.on('my message', (msg) => {
    io.emit('my broadcast', `server: ${msg}`);
  });

  socket.on('new_user', (name) => {
    users.push({
      id: socket.id,
      name
    });
    io.emit('my broadcast', `usergeld: ${name}`);
    io.emit('user_server', users);
  });

  socket.on('new_message', (message) => {
    messages.push("<b>" + message.name + ":</b> " + message.message);
    io.emit('messages', messages);
  });

  socket.on('disconnect', () => {
    const index = users.indexOf(socket.id);
    users.splice(index, 1);
    io.emit('users', users);
  });

});

http.listen(8081, () => {
  console.log('listening on *:8081');
});