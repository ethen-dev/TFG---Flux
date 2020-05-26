const request = require('supertest');
const requestUrl = 'http://localhost:8080';
let testUser = 'testtask@test.com';
const testPassword = '564s635d41f35sd4';
const boardName = 'boardTest';
const flowName = 'flowtest';
const taskName = 'testatsk';
let token, boardId, userId, flowId, taskId;


describe('Task Interactions', () => {
    beforeEach(async () => {
        const user = await request(requestUrl)
            .post(`/api/user/create/${testUser}/${testPassword}/testUser`);

        token = user.body.data.token;
        userId = user.body.data.id;
        testUser = 'testtask@test.com';

        const board = await request(requestUrl)
            .post(`/api/board/create/${userId}/${boardName}`);

        boardId = board.body.data.board._id;

        const flow = await request(requestUrl)
            .post(`/api/flow/create/${boardId}/${flowName}`);

        flowId = flow.body.data.flow._id;

        const task = await request(requestUrl)
            .post(`/api/task/create/${flowId}/${taskName}`)
            .send({
                description: 'formValues.taskDescription',
                priority: '1',
                sprint: '',
                tags: [],
                assignedTo: ''
            });

        taskId = task.body.data.task._id;
    })

    afterEach(async () => {
        const task = await request(requestUrl)
            .delete(`/api/task/delete/${taskId}`);

        const flow = await request(requestUrl)
            .delete(`/api/flow/delete/${flowId}`);

        const board = await request(requestUrl)
            .delete(`/api/board/delete/${boardId}`);

        const user = await request(requestUrl)
            .delete(`/api/user/delete/${testUser}/${testPassword}`);
    }) 

    test('getFlowTasks return status 200', async () => {
        const req = await request(requestUrl)
            .get(`/api/task/getAll/${flowId}`);

        expect(req.statusCode).toEqual(200);
        expect(req.body.data).toHaveProperty('tasks');
    })

    test('Update Task return status 200', async () => {
        const req = await request(requestUrl)
            .patch(`/api/task/update/${taskId}`)
            .send({
                name: 'Todo',
            });

        expect(req.statusCode).toEqual(200);
        expect(req.body.data.task.name).toEqual('Todo')
    })
});