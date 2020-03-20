const request = require('supertest');
const requestUrl = 'http://localhost:8080';
const boardName = 'boardTest';
let userId, boardId;

describe('Create Board', () => {
    it('Create Board return status 200', async () => {
        const user = await request(requestUrl)
            .post('/api/user/create/test@test.com/testPass');
        
        expect(user.statusCode).toEqual(200);

        userId = user.body.data.id;
        
        const req = await request(requestUrl)
            .post(`/api/board/create/${userId}/${boardName}`);
        
        expect(req.body.data).toHaveProperty('board');

        boardId = req.body.data.board._id;

        expect(req.statusCode).toEqual(200);
    })
})

describe('Get user Boards', () => {
    it('GetUserBoards return status 200', async () => {
        const req = await request(requestUrl)
            .get(`/api/board/getAll/${userId}`);

        expect(req.statusCode).toEqual(200);
        expect(req.body.data).toHaveProperty('boards');
    })
})

describe('Update Board', () => {
    it('Update Board return status 200', async () => {
        const req = await request(requestUrl)
            .patch(`/api/board/update/${boardId}`)
            .send({
                name: 'BoardUpdate',
            });

        expect(req.statusCode).toEqual(200);
        expect(req.body.data.board.name).toEqual('BoardUpdate')
    })
})

describe('Delete Board', () => {
    it('Delete Board return status 204', async () => {
        const req = await request(requestUrl)
            .delete(`/api/board/delete/${boardId}`);

        expect(req.statusCode).toEqual(204);

        const user = await request(requestUrl)
            .delete('/api/user/delete/test@test.com/testPass');

        expect(user.statusCode).toEqual(204);
    })
})