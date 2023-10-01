var express = require('express');
var router = express.Router();
const TodoController = require("../controllers/todo.controller");

router.get('/', TodoController.getAll);
router.get('/:todo_id', TodoController.getOne);
router.post('/', TodoController.createTodo);
router.patch('/:todo_id', TodoController.editTodo);
router.delete('/:todo_id', TodoController.delTodo);

module.exports = router;
