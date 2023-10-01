var express = require('express');
var router = express.Router();
const ActivityController = require("../controllers/activity.controller");

router.get('/', ActivityController.getAll);
router.get('/:activity_id', ActivityController.getOne);
router.post('/', ActivityController.createActivity);
router.delete('/:activity_id', ActivityController.delActivity);
router.patch('/:activity_id', ActivityController.editActivity);

module.exports = router;
