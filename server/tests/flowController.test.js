const request = require('supertest');
const requestUrl = 'http://localhost:8080';
let testUser = 'testflow@test.com';
const testPassword = '564s635d41f35sd4';
const boardName = 'boardTest';
const flowName = 'flowtest'
let token, boardId, userId, flowId;


describe('Flow Interactions', () => {
    beforeEach(async () => {
        const user = await request(requestUrl)
            .post(`/api/user/create/${testUser}/${testPassword}/testUser`);

        token = user.body.data.token;
        userId = user.body.data.id;
        testUser = 'testflow@test.com';

        const board = await request(requestUrl)
            .post(`/api/board/create/${userId}/${boardName}`);

        boardId = board.body.data.board._id;

        const flow = await request(requestUrl)
            .post(`/api/flow/create/${boardId}/${flowName}`);

        flowId = flow.body.data.flow._id;
    })

    afterEach(async () => {
        const flow = await request(requestUrl)
            .delete(`/api/flow/delete/${flowId}`);

        const board = await request(requestUrl)
            .delete(`/api/board/delete/${boardId}`);

        const user = await request(requestUrl)
            .delete(`/api/user/delete/${testUser}/${testPassword}`);
    }) 

    test('getBoardFlows return status 200', async () => {
        const req = await request(requestUrl)
            .get(`/api/flow/getAll/${boardId}`);

        expect(req.statusCode).toEqual(200);
        expect(req.body.data).toHaveProperty('flows');
    })

    test('Update Flow return status 200', async () => {
        const req = await request(requestUrl)
            .patch(`/api/flow/update/${flowId}`)
            .send({
                name: 'Todo',
            });

        expect(req.statusCode).toEqual(200);
        expect(req.body.data.flow.name).toEqual('Todo')
    })
});