const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // GET a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
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
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user) => 
      !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // DELETE user by its _id and remove the user's associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: User.thoughts } })
    )
    .then(() => res.json({ Message: 'User and associated thoughts deleted' }))
    .catch((err) => res.status(500).json(err));
  },
  // POST friend
  createFriend(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      { $addToSet: { friends: req.params.friendId}},
      {new: true}
    )
    .then((user) => 
      !user
      ? res.status(404).json({ message: 'No user with that ID' })
      : res.json(user))
    .catch((err) => res.status(500).json(err));
  },
  // Delete Friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId },
      { $pull: {friends: req.params.friendId} },
      {new: true}
    )
    .then((user) => 
      !user
      ? res.status(404).json({ message: 'No user with that ID' })
      : res.json(user))
    .catch((err) => res.status(500).json(err));
  },
};