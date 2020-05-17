const Task = require('../models/taskModel');
const Flow = require('../models/flowModel');

exports.createTask = async (req, res, next) => {
    const {flowId, taskName} = req.params;
    const {description, priority, sprint, assignedTo, tags} = req.body;

    const flow = await Flow.findById(flowId);

    if (!flow) {
        throw new Exception('Flow not found, task needs to be created at validated flow.')
    }

    const newTask = new Task({
        flowId,
        description,
        assignedTo,
        tags,
        priority: parseInt(priority),
        name: taskName,
        sprintId: sprint
    });

    newTask.save()
        .then(async () => {
            await Flow.findByIdAndUpdate(flowId, {hasTasks: true}, {
                new: true,
                runValidators: true
            });
            res
                .status(200)
                .json({
                    status: 'success',
                    message: 'Task successfully created',
                    data: {
                        task: newTask
                    }
                });
            next();
        })
        .catch(err => {
            res
                .status(400)
                .json({
                    status: 'fail',
                    message: err
                });
            next();
        });
};

exports.updateTask = async (req, res) => {
    try {
        const {taskId} = req.params;
        const {comment} = req.body;
        let task;

        if (comment) {
            task = await Task.findById(taskId);
            task.comments.push(comment);
            task = await Task.findByIdAndUpdate(taskId, task, {
                new: true,
                runValidators: true
            });
        } else {
            task = await Task.findByIdAndUpdate(taskId, req.body, {
                new: true,
                runValidators: true
            });
        }

        res
            .status(200)
            .json({
                status: 'success',
                message: 'Task successfully updated',
                data: {
                    task
                }
            });
        
    } catch (err) {
        res
            .status(400)
            .json({
                status: 'fail',
                message: err
            });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const {flowId} = req.params;
        const tasks = await Task.find({
            flowId
        });

        res 
            .status(200)
            .json({
                status: 'success',
                message: `User tasks for flow ${flowId} successfully readed`,
                data: {
                    tasks
                }
            });
        
    } catch (err) {
        res
            .status(400)
            .json({
                status: 'fail',
                message: err
            });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const {taskId} = req.params;
    
        await Task.findByIdAndDelete(taskId);

        res
            .status(204)
            .json({
                status: 'success',
                message: 'User flows successfully deleted',
                data: null
            });
    } catch (err) {
        res
            .status(400)
            .json({
                status: 'fail',
                message: err
            });
    }
};