const { Todo } = require('../models');

class TodoController {

    static async getAll(req, res) {
        try {
            const todo = await Todo.findAll({
                attributes: [['todo_id', 'id'], 'activity_group_id', 'title', 'priority', 'is_active', 'created_at', 'updated_at', 'deleted_at']
            });
            res.status(200).json({ status: 'Success', message: 'Success', data: todo });
        } catch (error) {
            res.status(500).json({ status: 'fail', message: error.message });
        }
    }

    static async getOne(req, res) {
        try {
            const Todo_id = req.params.todo_id
            const todo = await Todo.findOne({
                attributes: [['todo_id', 'id'], 'activity_group_id', 'title', 'priority','is_active', 'created_at', 'updated_at', 'deleted_at'],
                where: { Todo_id: Todo_id }
            });
            if (!todo) {
                return res.status(404).json({ status: "Not Found", message: 'Todo with ID '+Todo_id+' Not Found', data: [] });
            }
            return res.status(200).json({ status: 'Success', message: 'Success', data: todo });
        } catch (error) {
            res.status(500).json({ status: 'fail', message: error.message });
        }
    }

    static async createTodo(req, res) {
        const {title, activity_group_id, priority} = req.body
        const dataInput = {
            title: title,
            priority: priority,
            activity_group_id: activity_group_id
        }

        try {
            const result = await Todo.create(dataInput);
            const dataView = {
                created_at: result.created_at,
                updated_at: result.updated_at,
                id: result.todo_id,
                title: result.title,
                is_active: result.is_active,
                activity_group_id: result.activity_group_id,
                priority: result.priority,
            }
            res.status(201).json({ status: 'Success', message: 'Success', data: dataView });
        } catch (error) {
            if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    status : 'fail',
                    message : error.errors.map(e => e.message)
                })
            }
            console.log(error);
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error'
            });
        }
    }

    static async delTodo(req, res) {
        try {
            const Todo_id = req.params.todo_id
            const todo = await Todo.findOne({
                where: { Todo_id: Todo_id }
            });
            if (!todo) {
                return res.status(404).json({ status: "Not Found", message: 'Todo with ID '+Todo_id+' Not Found', data: [] });
            }
            await todo.destroy();
            res.status(200).json({ status: 'Success', message: 'Success', data: [] });
        } catch (error) {
            res.status(500).json({ status: 'Fail', message:error.message});
        }
    }

    static async editTodo(req, res){
        const Todo_id = req.params.todo_id
        const {title} = req.body
        const dataInput = {
            title: title
        }

        try {
            const ret = await Todo.findByPk(Todo_id);
            if (!ret) {
                return res.status(404).json({ status: "Not Found", message: 'Todo with ID '+Todo_id+' Not Found', data: [] });
            }
            await ret.update(dataInput,{
                where: {
                    todo_id: Todo_id
                },
            });
            return res.status(200).json({ status: 'Success', message: 'Success', data: ret });
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                return res.status(400).json({
                    status : 'fail',
                    errors : error.errors.map(e => e.message)
                })
            }
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error'
            });
        }
    }

}

module.exports = TodoController;