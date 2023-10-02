const { Activity } = require('../models');

class ActivityController {

    static async getAll(req, res) {
        try {
            const activity = await Activity.findAll({
                attributes: [['activity_id', 'id'], 'email', 'title', 'created_at', 'updated_at', 'deleted_at']
            });
            return res.status(200).json({ status: 'Success', message: 'Success', data: activity });
        } catch (error) {
            res.status(500).json({ status: 'fail', message: error.message });
        }
    }

    static async getOne(req, res) {
        try {
            const activity_id = req.params.activity_id
            const activity = await Activity.findOne({
                attributes: [['activity_id', 'id'], 'email', 'title', 'created_at', 'updated_at', 'deleted_at'],
                where: { activity_id: activity_id }
            });
            if (!activity) {
                return res.status(404).json({ status: "Not Found", message: 'Activity with ID '+activity_id+' Not Found', data: [] });
            }
            return res.status(200).json({ status: 'Success', message: 'Success', data: activity });
        } catch (error) {
            res.status(500).json({ status: 'fail', message: error.message });
        }
    }

    static async createActivity(req, res) {
        const {title, email} = req.body
        const dataInput = {
            title: title,
            email: email
        }

        try {
            const result = await Activity.create(dataInput);
            const dataView = {
                created_at: result.created_at,
                updated_at: result.updated_at,
                id: result.activity_id,
                title: result.title,
                email: result.email,
            }
            res.status(201).json({ status: 'Success', message: 'Success', data: dataView });
        } catch (error) {
            if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    status : 'Bad Request',
                    message : error.errors.map(e => e.message).join('').replace('Activity.', '')
                })
            }
            console.log(error);
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error'
            });
        }
    }

    static async delActivity(req, res) {
        try {
            const activity_id = req.params.activity_id
            const activity = await Activity.findOne({
                where: { activity_id: activity_id }
            });
            if (!activity) {
                return res.status(404).json({ status: "Not Found", message: 'Activity with ID '+activity_id+' Not Found', data: [] });
            }
            await activity.destroy();
            res.status(200).json({ status: 'Success', message: 'Your Activity has been successfully deleted', data: {} });
        } catch (error) {
            res.status(500).json({ status: 'Fail', message:error.message});
        }
    }

    static async editActivity(req, res){
        const activity_id = req.params.activity_id
        const {title} = req.body
        const dataInput = {
            title: title
        }

        try {
            const ret = await Activity.findByPk(activity_id);
            if (!ret) {
                return res.status(404).json({ status: "Not Found", message: 'Activity with ID '+activity_id+' Not Found', data: [] });
            }
            await ret.update(dataInput,{
                where: {
                    activity_id: activity_id
                },
            });
            const dataView = {
                created_at: ret.created_at,
                updated_at: ret.updated_at,
                id: ret.activity_id,
                title: ret.title,
                email: ret.email
            }
            res.status(200).json({ status: 'Success', message: 'Success', data: dataView });
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

module.exports = ActivityController;