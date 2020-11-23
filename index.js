var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var session = require("express-session")({
  secret: "gogogo",
  resave: true,
  saveUninitialized: true
});
var sharedsession = require("express-socket.io-session");

//var online_counter = 0;

// Attach session
app.use(session);

// Share session with io sockets
io.use(sharedsession(session, {
  autoSave: true
}));

function emit_sessions_cnt() {
  session.store.length((any, len) => {
    io.emit('counter_changed', len);
  });
}

function get_sessions_cnt() {
  let sess_cnt;
  session.store.length((any, len) => {
    sess_cnt = len;
  });
  return sess_cnt;
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html', { token: get_sessions_cnt() });
});

io.on('connection', (socket) => {
  emit_sessions_cnt();
  
  socket.on('disconnect', emit_sessions_cnt);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
