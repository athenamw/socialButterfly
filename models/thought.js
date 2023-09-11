const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (cheese) => {
        console.log("you got me");
        console.log(cheese, this);
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "reaction",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// new Date().toLocaleString()

thoughtSchema
  .virtual("reactionCount")
  //   getter
  .get(function () {
    return `${this.reactions.length}`;
  });

const Thought = model("thought", thoughtSchema);

Thought.find({}).then((data) => {
  console.log(data);
});

module.exports = Thought;
