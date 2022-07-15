const express = require("express");
const bodyParser = require("body-parser");
const { createTodo, listAllTodo, getTodoById, updateTodoById, deleteTodoById, sortAllTodo } = require("./app/controllers/todo");
const { todoCreateUpdateSchema } = require("./app/validators/todo.validator");
const app = express();

app.use(bodyParser.json());

app.post("/createTodo", [todoCreateUpdateSchema], createTodo);
app.get("/todo", listAllTodo);
app.get("/getTodoById/:id", getTodoById);
app.post("/updateTodo/:id", [todoCreateUpdateSchema], updateTodoById);
app.delete("/deleteTodo/:id", deleteTodoById);
app.get("/sortAlltodo", sortAllTodo);

app.get("*", (req, res) => {
  return res.status(404).send(404);
});

app.listen(8000, () => {
  console.log("Server started at: 8000");
});
