const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");
var advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

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
      get: (value) => {
        return dayjs(value).format("MMM Do, YYYY [at] hh:mm a");
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
