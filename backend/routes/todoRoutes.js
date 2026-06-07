const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.route("/").get(getAllTodos).post(createTodo);
router.route("/:id").get(getTodoById).put(updateTodo).delete(deleteTodo);
router.route("/:id/toggle").patch(toggleTodo);

module.exports = router;
