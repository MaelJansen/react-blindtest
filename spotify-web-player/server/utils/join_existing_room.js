function joinExistingRoom(socket, room, username, profile_picture, spotify_user_id, allUsers, CHAT_BOT) {
    socket.join(room);
    console.log(`${username} joined room ${room}`);
    // Save the new user to the room
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room, profile_picture, spotify_user_id });

    // Send all users in the room to the client
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
    let __createdtime__ = Date.now(); // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit('receive_message', {
        message: `${username} a rejoint la partie`,
        username: CHAT_BOT,
        __createdtime__,
    });
    // Send welcome msg to user that just joined chat only
    socket.emit('receive_message', {
        message: `Salut, ${username}`,
        username: CHAT_BOT,
        __createdtime__,
    });
}

module.exports = joinExistingRoom;
