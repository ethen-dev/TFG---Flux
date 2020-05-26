const request = require('supertest');
const requestUrl = 'http://localhost:8080';
let testUser = 'testuser@test.com';
const testPassword = '564s635d41f35sd4';
let token;
let userId;


describe('User Interactions', () => {
    beforeEach(async () => {
        const req = await request(requestUrl)
            .post(`/api/user/create/${testUser}/${testPassword}/testUser`);

        token = req.body.data.token;
        userId = req.body.data.id;
        testUser = 'testuser@test.com';
    })

    afterEach(async () => {
        const req = await request(requestUrl)
            .delete(`/api/user/delete/${testUser}/${testPassword}`);

    })

    test('Auth User return status 200', async () => {
        const req = await request(requestUrl)
            .get(`/api/user/auth/${testUser}/${testPassword}`);
        
        expect(req.statusCode).toEqual(200);
    })

    test('Update User return status 200', async () => {
        const req = await request(requestUrl)
            .patch(`/api/user/update/${userId}`)
            .send({
                userName: 'pepe@test.com',
            });

        expect(req.statusCode).toEqual(200);
        expect(req.body.data.user.userName).toEqual('pepe@test.com');
    })

    test('Get UserName return status 200 and match the name', async () => {
        const req = await request(requestUrl)
            .get(`/api/user/get/username/${userId}`);

        expect(req.statusCode).toEqual(200);
        expect(req.body.data.userName).toEqual('testUser');
    })
});



