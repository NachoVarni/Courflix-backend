const User = require("../models/userModel");

class UserService {
  getUsers() {
    const query = User.find().exec();
    return query;
  }

  getUserById(id) {
    const query = User.findOne({ _id: id }).exec();
    return query;
  }

  getByName(name) {
    const query = User.findOne({ name }).exec();
    return query;
  }

  modifyUser(id, data) {
    const user = User.findOneAndUpdate({ _id: id }, data).exec();
    return user;
  }

  addUser(data) {
    const newUser = new User(data);
    return newUser.save();
  }

  deleteUser(id) {
    const query = User.deleteOne({ _id: id }).exec();
    return query;
  }
}

module.exports = UserService;
