const users = [];

const userJoins = (id, userName, roomId) => {
  const user = { id, userName, roomId };

  users.push(user);

  return user;
};

const getCurrentUser = (id) => users.find((user) => user.id === id);

const userLeaves = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getRoomUsers = (roomId) => {
  return users.filter((user) => user.roomId === roomId);
};

module.exports = {
  userJoins,
  getCurrentUser,
  userLeaves,
  getRoomUsers
};
