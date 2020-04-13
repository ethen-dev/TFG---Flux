const Flow = require('../models/flowModel');
const Board = require('../models/boardModel');

exports.createFlow = async (req, res, next) => {
    const {boardId, flowName} = req.params;

    const board = await Board.findById(boardId);

    if (!board) {
        throw new Exception('Board not found, flow needs to be created at validated board.')
    }

    const newFlow = new Flow({
        boardId,
        name: flowName,
    });

    newFlow.save()
        .then(async () => {
            await Board.findByIdAndUpdate(boardId, {hasFlows: true}, {
                new: true,
                runValidators: true
            });
            res
                .status(200)
                .json({
                    status: 'success',
                    message: 'Flow successfully created',
                    data: {
                        flow: newFlow
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

exports.updateFlow = async (req, res) => {
    try {
        const {flowId} = req.params;
        
        const flow = await Flow.findByIdAndUpdate(flowId, req.body, {
            new: true,
            runValidators: true
        });

        res
            .status(200)
            .json({
                status: 'success',
                message: 'Flow successfully updated',
                data: {
                    flow
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

exports.getAllFlows = async (req, res) => {
    try {
        const {boardId} = req.params;
        const flows = await Flow.find({
            boardId
        });

        res 
            .status(200)
            .json({
                status: 'success',
                message: `User flows for board ${boardId} successfully readed`,
                data: {
                    flows
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

exports.deleteFlow = async (req, res) => {
    try {
        const {flowId} = req.params;
    
        await Flow.findByIdAndDelete(flowId);

        res
            .status(204)
            .json({
                status: 'success',
                message: 'User boards successfully deleted',
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