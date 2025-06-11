const User = require("../models/user");

module.exports.getTodos = async (req, res) => {
  const { username } = req.query;
  console.log("username", username);
  const foundUser = await User.findOne({ username });
  if (!foundUser) {
    return res.json({ success: false, message: "User not found" });
  }
  console.log("todos", foundUser.todos);
  return res.json({ success: true, todos: foundUser.todos });
};

module.exports.addTodo = async (req, res) => {
  const { username, todo } = req.body;
  const foundUser = await User.findOne({ username });
  if (!foundUser) {
    return res.json({ success: false, message: "User not found" });
  }

  const { title, description } = todo;
  foundUser.todos.push({ title, description, completed: false });
  await foundUser.save();
  return res.json({ success: true, todos: foundUser });
};
