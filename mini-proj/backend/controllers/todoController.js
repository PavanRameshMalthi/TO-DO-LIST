const Todo = require("../models/Todo");

// @desc    Get all todos (with optional filter & search)
// @route   GET /api/todos
const getAllTodos = async (req, res) => {
  try {
    const { filter, search } = req.query;
    let query = {};

    if (filter === "Pending")   query.completed = false;
    if (filter === "Completed") query.completed = true;
    if (search) query.text = { $regex: search, $options: "i" };

    const todos = await Todo.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo)
      return res.status(404).json({ success: false, message: "Todo not found" });
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a todo
// @route   POST /api/todos
const createTodo = async (req, res) => {
  try {
    const { text, priority } = req.body;
    if (!text || !text.trim())
      return res.status(400).json({ success: false, message: "Task text is required" });

    const todo = await Todo.create({
      text: text.trim(),
      priority: priority || "Medium",
    });
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
const updateTodo = async (req, res) => {
  try {
    const { text, priority, completed } = req.body;
    const updates = {};
    if (text      !== undefined) updates.text      = text.trim();
    if (priority  !== undefined) updates.priority  = priority;
    if (completed !== undefined) updates.completed = completed;

    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!todo)
      return res.status(404).json({ success: false, message: "Todo not found" });
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Toggle completed status
// @route   PATCH /api/todos/:id/toggle
const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo)
      return res.status(404).json({ success: false, message: "Todo not found" });

    todo.completed = !todo.completed;
    await todo.save();
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo)
      return res.status(404).json({ success: false, message: "Todo not found" });
    res.status(200).json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
};
