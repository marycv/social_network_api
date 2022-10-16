const router = require('express').Router();
const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
  } = require('../../controllers/thoughtController');
  
  // /api/thoughts
  router
    .route('/')
    .get(getThoughts)
    .get(getThought)
    .post(createThought)
    .put(updateThought)
    .delete(deleteThought);
  
  // /api/thoughts/:thoughtId/reactions
  router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);
  
  module.exports = router;
  