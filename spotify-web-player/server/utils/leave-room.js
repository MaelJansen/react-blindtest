// utils/leave-room.js

function leaveRoom(socketId, chatRoomUsers) {
  const updatedUsers = chatRoomUsers.filter((user) => user.id !== socketId);
  return updatedUsers;
}

module.exports = leaveRoom;
