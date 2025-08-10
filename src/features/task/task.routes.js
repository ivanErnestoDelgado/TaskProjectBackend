const express = require('express');
const router = express.Router();
const taskController = require('./task.controller');
const authMiddleware=require('../../shared/middlewares/authMiddleware');
const validate = require('../../shared/middlewares/validateMiddleware');
const {
    createTaskSchema,
    updateTaskSchema,
    getTaskQuerySchema
}=require('./task.validator')



router.use(authMiddleware);



router.get(
    "/", 
    validate({
        query: getTaskQuerySchema
    }),
    taskController.getTasks
);

router.get(
    "/:id",
    taskController.getSpecificTask
);

router.post(
    "/",
    validate({
        body: createTaskSchema
    }), 
    taskController.createTask
);

router.put(
    "/:id",
    validate({
        body: updateTaskSchema
    }), 
    taskController.updateTask
);

router.delete(
    "/:id", 
    taskController.deleteTask
);

module.exports = router;