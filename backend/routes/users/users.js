const users = require("express").Router();
// const getUserPosts = require(".././users/userPostRoute");
const {
  createUser,
  allUsers,
  deleteUser,
  getUser,
  getUserPosts
} = require("../../queries/users/users");

const { checkFirebaseToken } = require("../../middleware/Auth");
// users.use("/:id/posts", checkFirebaseToken, getUserPosts);
users.post("/", checkFirebaseToken, createUser);
users.get("/", allUsers);
users.get("/:id", checkFirebaseToken, getUser);
users.delete("/:id", deleteUser);
users.get("/:id/posts", checkFirebaseToken, getUserPosts)
module.exports = users;
