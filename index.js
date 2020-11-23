const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const redis = require("redis");
const session = require("express-session")({
  secret: "gogogo",
  resave: true,
  saveUninitialized: true
});
const sharedsession = require("express-socket.io-session");
const { promisify } = require("util");

const rclient = redis.createClient();
const hdelAsync = promisify(rclient.hdel).bind(rclient);
const hincrbyAsync = promisify(rclient.hincrby).bind(rclient);
const hlenAsync = promisify(rclient.hlen).bind(rclient);

app.use(session);

io.use(sharedsession(session));

 
rclient.on("error", function(error) {
  console.error(error);
});
rclient.del("online_users");

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  hincrbyAsync("online_users", socket.handshake.session.id, 1)
    .then(res => hlenAsync("online_users"))
    .then(online_count => io.emit('counter_changed', online_count));
  
  socket.on('disconnect', () => {
    hincrbyAsync("online_users", socket.handshake.session.id, -1)
      .then(views => {
        if (views <= 0)
          return hdelAsync("online_users", socket.handshake.session.id)
            .then(hlenAsync("online_users"));
        else
          return hlenAsync("online_users");
      })
    .then(online_count => io.emit('counter_changed', online_count));
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
