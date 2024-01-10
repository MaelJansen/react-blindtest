const express = require('express');
const request = require('request');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const session = require('express-session');
const leaveRoom = require('./utils/leave-room');
const joinExistingRoom = require('./utils/join_existing_room');
const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const port = 5000;
const CHAT_BOT = 'ChatBot';
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room
let playlist = []; // Playlist of the current chat room

global.access_token = '';

dotenv.config();

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

var spotify_redirect_uri = 'http://192.168.138.93:3000/auth/callback';

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var app = express();
app.use(cors());
app.use(session({ secret: generateSecretKey(), resave: true, saveUninitialized: true })); // Configure express-session



const server = http.createServer(app);

// Create an io server and allow for CORS from http://192.168.138.93:port with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: 'http://192.168.138.93:3000',
    methods: ['GET', 'POST'],
  },
});

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on('create_room', (data) => {
    const { username, profile_picture, spotify_user_id, score } = data;
    const room = generateRandomString(6);
    // You may emit an event here to send the room code back to the client, if needed
    socket.emit('room_created', room);
    joinExistingRoom(socket, room, username, profile_picture, spotify_user_id, score, allUsers, CHAT_BOT);
  });

  socket.on('update_score', (data) => {
    console.log("test de update score")
    const {username, room, spotify_user_id, newScore} = data;
    const existingUser = allUsers.find(user => user.spotify_user_id === spotify_user_id && user.room === room);

    if (existingUser) {
      existingUser.score = newScore;
      console.log("updateScore");
      
      chatRoomUsers = allUsers.filter((user) => user.room === room);
      socket.to(room).emit('chatroom_users', chatRoomUsers);
      socket.emit('chatroom_users', chatRoomUsers);
      return;
    }
  });

  // We can write our socket event listeners in here...
  socket.on('join_room', (data) => {
    const { username, room, profile_picture, spotify_user_id, score } = data;

    // Check if the room exists before allowing a user to join
    console.log(username);
    console.log(room);
    console.log(io.sockets.adapter.rooms);

    const roomExists = io.sockets.adapter.rooms.has(room);

    if (!roomExists) {
      console.log(`Room ${room} does not exist`);
      // Emit an event to inform the client that the room doesn't exist
      socket.emit('room_not_found', { room });
      return;
    }

    const existingUser = allUsers.find(user => user.spotify_user_id === spotify_user_id && user.room === room);

    if (existingUser) {
      // Do not allow multiple connections with the same Spotify account in the same room
      console.log(`User ${username} with Spotify ID ${spotify_user_id} already connected in room ${room}`);
      socket.emit('existing_user', { username, room });
      return;
    }

    // Send the codeof the room to the client
    socket.emit('room_code', room);

    joinExistingRoom(socket, room, username, profile_picture, spotify_user_id, score, allUsers, CHAT_BOT);

    
  });

socket.on('leave_room', (data) => {
  const { username, room } = data;
  socket.emit('room_code', null);
  socket.leave(room);
  const __createdtime__ = Date.now();
  // Remove user from memory
  allUsers = leaveRoom(socket.id, allUsers);
  socket.to(room).emit('chatroom_users', allUsers); // Notify other clients in the room about the updated player list
  socket.to(room).emit('receive_message', {
    username: CHAT_BOT,
    message: `${username} a quitté la partie`,
    __createdtime__,
  });
  console.log(`${username} left room ${room}`);
});

  // Listen for 'start_game' event
  socket.on('loads_game', (data) => {
    const { room } = data;
    // Broadcast to all clients in the room that the game has started
    io.to(room).emit('game_loaded');
  });

  socket.on('playlist_crafted', (data) => {
    const { room, hostPlaylist, __createdtime__ } = data;
    playlist = hostPlaylist;

    // Broadcast to all clients in the room that the game has started
    io.to(room).emit('playlist_loaded', { playlist, __createdtime__ });

    // Plays the first track of the playlist
    io.to(room).emit('play_track', { track: playlist[0], __createdtime__ });
  
  });

  socket.on('next_track', (data) => {
    const { room, __createdtime__ } = data;
    // removes first element and plays the new first
    playlist.shift();
    io.to(room).emit('play_track', { track: playlist[0], __createdtime__ });
  }
  );

  socket.on('send_message', (data) => {
    const { message, username, room, __createdtime__} = data;
    io.to(room).emit('receive_message', { message, username, __createdtime__ });
  });
});

app.get('/auth/login', (_, res) => {
  var scope = 'streaming user-read-email user-read-private';
  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state,
  });

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

app.get('/auth/callback', (req, res) => {
  var code = req.query.code;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization: 'Basic ' + Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const userToken = body.access_token;

      // Save the access token in the user's session
      req.session.access_token = userToken;

      res.redirect('/');
    }
  });
});

app.get('/auth/token', (req, res) => {
  const userToken = req.session.access_token || '';
  res.json({ access_token: userToken });
});


app.get('/auth/logout', (_, res) => {
  access_token = '';
  res.clearCookie('connect.sid');
  userToken = '';
  res.redirect('/');
});

server.listen(port, () => {
  console.log(`Listening at http://192.168.138.93:${port}`);
});