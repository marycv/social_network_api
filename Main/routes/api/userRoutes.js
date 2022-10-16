const router = require('express').Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
  getSingleUser
} = require('../../controllers/userController');

// /api/users
router
    .route('/')
    .get(getUsers)
    .post(createUser)
    // remove a user's associated thoughts when deleted

router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendsId')
    .post(createFriend)
    .delete(deleteFriend);

module.exports = router;