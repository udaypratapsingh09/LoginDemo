const router = require("express").Router();
const User = require("../models/user");
const { getTodos, addTodo } = require("../controllers/todoController");

router.get("/get-todos", getTodos);
router.post("/add-todo", addTodo);

module.exports = router;
