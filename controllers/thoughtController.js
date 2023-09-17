const { Thought, User, Reaction } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    console.log("getThoughts");
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    console.log("getsingleThought");
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    console.log("createThought");
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    console.log("deleteThought");
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }

      await User.deleteMany({ _id: { $in: thought.users } });
      res.json({ message: "Thoughts and users deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    console.log("updateThought");
    try {
      const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });

      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    console.log("createReaction");
    try {
      await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } });
      const updatedThought = await Thought.findOne({ _id: req.params.thoughtId });
      res.status(200).json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    console.log("deleteReaction");
    try {
      await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { _id: req.params.reactionId } } });
      const updatedThought = await Thought.findOne({ _id: req.params.thoughtId });
      res.status(200).json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
