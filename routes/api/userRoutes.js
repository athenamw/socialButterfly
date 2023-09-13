const router = require("express").Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser } = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(createFriend).delete(deleteFriend);

module.exports = router;
