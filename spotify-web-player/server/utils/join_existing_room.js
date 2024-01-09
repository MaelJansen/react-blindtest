function joinExistingRoom(socket, room, username, profile_picture, spotify_user_id, score, allUsers, CHAT_BOT) {
    socket.join(room);
    console.log(`${username} joined room ${room}`);
  
    // Check if the user already exists in the room
    const existingUserIndex = allUsers.findIndex(
      (user) => user.spotify_user_id === spotify_user_id && user.room === room
    );
  
    if (existingUserIndex !== -1) {
      // Update existing user information
      allUsers[existingUserIndex] = {
        id: socket.id,
        username,
        room,
        profile_picture,
        spotify_user_id,
        score,
      };
    } else {
      // Add the user to the room
      allUsers.push({
        id: socket.id,
        username,
        room,
        profile_picture,
        spotify_user_id,
        score,
      });
    }
  
    // Send all users in the room to the client
    const chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
  
    const __createdtime__ = Date.now(); // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit('receive_message', {
      message: `${username} a rejoint la partie`,
      username: CHAT_BOT,
      __createdtime__,
    });
    // Send welcome msg to the user that just joined the chat only
    socket.emit('receive_message', {
      message: `Salut, ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });
  }
  
  module.exports = joinExistingRoom;
  
