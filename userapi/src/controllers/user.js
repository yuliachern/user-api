const db = require('../dbClient');

module.exports = {
  create: async (user, callback) => {
    try {
      if (!user.username) {
        return callback(new Error("Wrong user parameters"), null);
      }
      const userObj = {
        firstname: user.firstname,
        lastname: user.lastname,
      };      
      await db.hSet(user.username, userObj); 
      callback(null, 'OK');
    } catch (err) {
      callback(err, null);
    }
  },
  read: async (username, callback) => {
    try {
      const user = await db.hGetAll(username);
      if (!user || Object.keys(user).length === 0) {
        return callback(new Error("User not found"), null);
      }
      callback(null, user);
    } catch (err) {
      callback(err, null);
    }
  },
  update: async (username, updateData, callback) => {
    try {
      const exists = await db.exists(username);
      if (!exists) {
        return callback(new Error("User does not exist"), null);
      }

      await db.hSet(username, updateData);
      callback(null, 'Updated');
    } catch (err) {
      callback(err, null);
    }
  },
  delete: async (username, callback) => {
    try {
      const deleted = await db.del(username);
      if (deleted === 0) {
        return callback(new Error("User not found"), null);
      }
      callback(null, 'Deleted');
    } catch (err) {
      callback(err, null);
    }
  }
};
