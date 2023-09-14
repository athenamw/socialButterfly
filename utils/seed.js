const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getUserThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let thoughtCheck = await connection.db.listCollections({ name: "thoughts" }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let userCheck = await connection.db.listCollections({ name: "users" }).toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  const users = [
    {
      username: "michaels",
      email: "michael.scott@dundermifflin.com",
    },
    {
      username: "dwights",
      email: "dwight.schrute@dundermifflin.com",
    },
    {
      username: "oscarm",
      email: "oscar.martinez@dundermifflin.com",
    },
    {
      username: "jimh",
      email: "james.halpert@dundermifflin.com",
    },
    {
      username: "pamb",
      email: "pamela.beesly@dundermifflin.com",
    },
    {
      username: "erinh",
      email: "erin.hannon@dundermifflin.com",
    },
    {
      username: "kevinm",
      email: "kevin.malone@dundermifflin.com",
    },
    {
      username: "andyb",
      email: "andrew.bernard@dundermifflin.com",
    },
    {
      username: "tobyf",
      email: "tobias.flenderson@dundermifflin.com",
    },
    {
      username: "angelam",
      email: "angela.martin@dundermifflin.com",
    },
    {
      username: "stanleyh",
      email: "stanley.hudson@dundermifflin.com",
    },
  ];
  const thoughts = getUserThoughts(10);

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.info("Seeding complete! 🌱");

  process.exit(0);
});
