const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// Aggregate function to get the number of users overall
const headCount = async () => {
  const numberOfUsers = await User.aggregate().count("userCount");
  return numberOfUsers;
};

module.exports = {
  // Get all users
  async getUsers(req, res) {
    console.log("getUsers");
    try {
      const users = await User.find();

      const userObj = {
        users,
        headCount: await headCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    console.log("getSingleUser");
    try {
      const user = await User.findOne({ _id: req.params.userId }).select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    console.log("createUser");
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove them from the course
  async deleteUser(req, res) {
    console.log("deleteUser");
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      const thought = await Thought.findOneAndUpdate({ users: req.params.userId }, { $pull: { users: req.params.userId } }, { new: true });

      if (!thought) {
        return res.status(404).json({
          message: "User deleted, but no thoughts found",
        });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    console.log("updateUser");
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });

      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createFriend(req, res) {
    console.log("createFriend");
    try {
      // find friend user document from users collection
      const friend = await User.findOne({ _id: req.params.friendId });
      //   add friend document to selected user
      await User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: friend } });
      // find updated user document from users collection
      const updatedUser = await User.findOne({ _id: req.params.userId });
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    console.log("deleteFriend");
    try {
      // find friend user document from users collection
      const friend = await User.findOne({ _id: req.params.friendId });
      //   delete friend document to selected user
      await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: new ObjectId(friend._id) } });
      // find updated user document from users collection
      const updatedUser = await User.findOne({ _id: req.params.userId });
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
