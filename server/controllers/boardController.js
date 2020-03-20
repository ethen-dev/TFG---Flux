const Board = require('../models/boardModel');

exports.createBoard = (req, res, next) => {
    const {userId, boardName} = req.params;

    const newBoard = new Board({
        userId,
        name: boardName,
    });

    newBoard.save()
        .then(doc => {
            res
                .status(200)
                .json({
                    status: 'success',
                    message: 'Board succefully created'
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

exports.updateBoard = async (req, res) => {
    try {
        const {boardId} = req.params;
        const board = await Board.findByIdAndUpdate(boardId, req.body, {
            new: true,
            runValidators: true
        });

        res
            .status(200)
            .json({
                status: 'success',
                message: 'Board succefully updated',
                data: {
                    board
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

exports.getAllBoards = async (req, res) => {
    try {
        const {userId} = req.params;
        const boards = await Board.find({userId});

        res 
            .status(200)
            .json({
                status: 'success',
                message: 'User boards succefully readed',
                data: {
                    boards
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

exports.deleteBoard = async (req, res) => {
    try {
        const {boardId} = req.params;
    
        await Board.findByIdAndDelete(boardId);

        res
            .status(204)
            .json({
                status: 'success',
                message: 'User boards succefully deleted',
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