const request = require('supertest');
const requestUrl = 'http://localhost:8080';
let testUser = 'testboard@test.com';
const testPassword = '564s635d41f35sd4';
const boardName = 'boardTest';
let token, boardId, userId;


describe('Board Interactions', () => {
    beforeEach(async () => {
        const user = await request(requestUrl)
            .post(`/api/user/create/${testUser}/${testPassword}/testUser`);
        token = user.body.data.token;
        userId = user.body.data.id;
        testUser = 'testboard@test.com';

        const board = await request(requestUrl)
            .post(`/api/board/create/${userId}/${boardName}`);

        boardId = board.body.data.board._id;
    })

    afterEach(async () => {
        const board = await request(requestUrl)
            .delete(`/api/board/delete/${boardId}`);

        const user = await request(requestUrl)
            .delete(`/api/user/delete/${testUser}/${testPassword}`);
    })

    test('GetUserBoards return status 200', async () => {
        const req = await request(requestUrl)
            .get(`/api/board/getAll/${userId}`);

        expect(req.statusCode).toEqual(200);
        expect(req.body.data).toHaveProperty('boards');
    })

    test('Update Board return status 200', async () => {
        const req = await request(requestUrl)
            .patch(`/api/board/update/${boardId}`)
            .send({
                name: 'BoardUpdate',
            });

        expect(req.statusCode).toEqual(200);
        expect(req.body.data.board.name).toEqual('BoardUpdate');
    })
});