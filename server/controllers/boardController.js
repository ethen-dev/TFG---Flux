const Board = require('../models/boardModel');
const User = require('../models/userModel');

exports.createBoard = async (req, res, next) => {
    const {userId, boardName} = req.params;
    const {isScrum} = req.body;

    const user = await User.findById(userId);

    if (!user) {
        throw new Exception('User not found, need valid user to create a board')
    }

    const members = [];
    members.push(userId);

    const config = {
        userId,
        members,
        name: boardName,
    };

    if (isScrum) {
        config.isScrum = true;
    }

    const newBoard = new Board(config);
    
    newBoard.save()
        .then(async () => {
            await User.findByIdAndUpdate(userId, {hasBoards: true}, {
                new: true,
                runValidators: true
            });          
            res
                .status(200)
                .json({
                    status: 'success',
                    message: 'Board successfully created',
                    data: {
                        board: newBoard,
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

exports.updateBoard = async (req, res) => {
    try {
        const {boardId} = req.params;
        console.log(req.body)
        const board = await Board.findByIdAndUpdate(boardId, req.body, {
            new: true,
            runValidators: true
        });

        res
            .status(200)
            .json({
                status: 'success',
                message: 'Board successfully updated',
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
        const user = await User.findById(userId);
        
        if (!user.hasBoards) {
            throw new Exception('No Boards found');
        }

        const boards = await Board.find({
            members: {
                $regex: userId,
                $options: 'i'
            }
        });

        res 
            .status(200)
            .json({
                status: 'success',
                message: 'User boards successfully readed',
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