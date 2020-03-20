const request = require('supertest');
const requestUrl = 'http://localhost:8080';
let token;

describe('Create User', () => {
    it('Create User return status 200', async () => {
        const req = await request(requestUrl)
            .post('/api/user/create/test@test.com/testPass');
            
        token = req.body.data.token;

        expect(req.statusCode).toEqual(200);
    })
})

describe('Auth User', () => {
    it('Auth User return status 200', async () => {
        const req = await request(requestUrl)
            .get('/api/user/auth/test@test.com/testPass');
        
        expect(req.statusCode).toEqual(200);
    })
})

describe('Auth Token', () => {
    it('Auth User return status 200', async () => {
        const req = await request(requestUrl)
            .get(`/api/user/token/${token}`);

        expect(req.statusCode).toEqual(200);
    })
})

describe('Delete User', () => {
    it('Delete User return status 204', async () => {
        const req = await request(requestUrl)
            .delete('/api/user/delete/test@test.com/testPass');

        expect(req.statusCode).toEqual(204);
    })
})

