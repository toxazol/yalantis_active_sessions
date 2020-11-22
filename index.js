var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var session = require("express-session")({
  secret: "gogogo",
  resave: true,
  saveUninitialized: true
});
var sharedsession = require("express-socket.io-session");
var online_counter = 0;

// Attach session
app.use(session);

// Share session with io sockets
io.use(sharedsession(session, {
  autoSave: true
}));

app.get('/', (req, res) => {
  console.log(req.session);
  if (req.session.views) {
    req.session.views++
  }
  else {
    req.session.views = 1;
  }
  res.sendFile(__dirname + '/index.html', { token: online_counter });
});

io.on('connection', (socket) => {
  console.log('socket.handshake.session.views: ', socket.handshake.session.views);
  if (socket.handshake.session.views <= 1) {
    online_counter++;
    console.log('new user connected:', online_counter);
  }
  else {
    console.log('old user connected:', online_counter);
  }
  io.emit('counter_changed', online_counter);

  socket.on('disconnect', () => {
    socket.handshake.session.views--;
    if (socket.handshake.session.views <= 0) {
      online_counter--;
      io.emit('counter_changed', online_counter);
      console.log('a user disconnected:', online_counter);
    }
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
