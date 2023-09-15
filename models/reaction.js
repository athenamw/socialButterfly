const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");
var advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value) => {
        return dayjs(value).format("MMM Do, YYYY [at] hh:mm a");
      },
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

module.exports = reactionSchema;
