const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // GET a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate('thoughts')
    .populate('friends')
    .then(async (user) => {
      return res.json(user)
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },
  // POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // PUT to update a user by its _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$set: req.body},
      {new: true}
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // DELETE user by its _id
  deleteUser(req, res) {
    User.findOneAndRemove(
      {_id: req.params.userId}
    )
    .then((user) => res.json('User has been deleted'))
    .catch((err) => res.status(500).json(err));
  }
}