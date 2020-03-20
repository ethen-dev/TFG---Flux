const request = require('supertest');
const requestUrl = 'http://localhost:8080';
const flowName = 'Doing', boardName = 'BoardTest';
let userId, boardId, flowId;

describe('Create Flow', () => {
    it('Create Flow return status 200', async () => {
        const user = await request(requestUrl)
            .post('/api/user/create/test@test.com/testPass');

        expect(user.statusCode).toEqual(200);

        userId = user.body.data.id;

        const board = await request(requestUrl)
            .post(`/api/board/create/${userId}/${boardName}`);

        expect(board.body.data).toHaveProperty('board');

        boardId = board.body.data.board._id;

        const req = await request(requestUrl)
            .post(`/api/flow/create/${boardId}/${flowName}`);

        expect(req.body.data).toHaveProperty('flow');

        flowId = req.body.data.flow._id;

        expect(req.statusCode).toEqual(200);
    })
})

describe('Get board flows', () => {
    it('getBoardFlows return status 200', async () => {
        const req = await request(requestUrl)
            .get(`/api/flow/getAll/${boardId}`);

        expect(req.statusCode).toEqual(200);
        expect(req.body.data).toHaveProperty('flows');
    })
})

describe('Update Flow', () => {
    it('Update Flow return status 200', async () => {
        const req = await request(requestUrl)
            .patch(`/api/flow/update/${flowId}`)
            .send({
                name: 'Todo',
            });

        expect(req.statusCode).toEqual(200);
        expect(req.body.data.flow.name).toEqual('Todo')
    })
})

describe('Delete Board', () => {
    it('Delete Board return status 204', async () => {
        const req = await request(requestUrl)
            .delete(`/api/flow/delete/${flowId}`);

        expect(req.statusCode).toEqual(204);

        const board = await request(requestUrl)
            .delete(`/api/board/delete/${boardId}`);

        expect(board.statusCode).toEqual(204);

        const user = await request(requestUrl)
            .delete('/api/user/delete/test@test.com/testPass');

        expect(user.statusCode).toEqual(204);
    })
})