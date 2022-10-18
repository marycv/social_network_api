const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');

module.exports = {
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => { res.status(500).json(err));
            
    },
    // GET a single thought by its _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((user) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // POST a new thought (push the created thought's _id to the associated user's thoughts array field)
    createThought(req, res) {
        Thought.create(req.body)
            {  }
    },
    // PUT to update a thought by its _id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // DELETE a thought by its _id
    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: req.params.thoughtId }
        )
        .then((user) => res.json('Thought has been deleted'))
        .catch((err) => res.status(500).json(err));
    },
};