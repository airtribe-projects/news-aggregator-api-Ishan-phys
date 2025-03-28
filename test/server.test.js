const tap = require('tap');
const supertest = require('supertest');
const app = require('../app');
<<<<<<< HEAD
=======
require('dotenv').config();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
>>>>>>> master
const server = supertest(app);

const mockUser = {
    name: 'Clark Kent',
<<<<<<< HEAD
    email: 'clark@superman.com',
    password: 'Krypt()n8',
    preferences:['movies', 'comics']
=======
    email: 'clark+test@superman.com',
    password: 'Krypt()n8',
    preferences: ['movies', 'comics']
>>>>>>> master
};

let token = '';

<<<<<<< HEAD
// Auth tests

tap.test('POST /users/signup', async (t) => { 
    const response = await server.post('/users/signup').send(mockUser);
    t.equal(response.status, 200);
    t.end();
});

tap.test('POST /users/signup with missing email', async (t) => {
=======
tap.before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Auth tests
tap.test('POST /users/signup', async (t) => {
    t.plan(1);
    const response = await server.post('/users/signup').send(mockUser);
    t.equal(response.status, 200);
});

tap.test('POST /users/signup with missing email', async (t) => {
    t.plan(1);
>>>>>>> master
    const response = await server.post('/users/signup').send({
        name: mockUser.name,
        password: mockUser.password
    });
    t.equal(response.status, 400);
<<<<<<< HEAD
    t.end();
});

tap.test('POST /users/login', async (t) => { 
=======
});

tap.test('POST /users/login', async (t) => {
    t.plan(2);
>>>>>>> master
    const response = await server.post('/users/login').send({
        email: mockUser.email,
        password: mockUser.password
    });
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'token');
    token = response.body.token;
<<<<<<< HEAD
    t.end();
});

tap.test('POST /users/login with wrong password', async (t) => {
=======
});

tap.test('POST /users/login with wrong password', async (t) => {
    t.plan(1);
>>>>>>> master
    const response = await server.post('/users/login').send({
        email: mockUser.email,
        password: 'wrongpassword'
    });
    t.equal(response.status, 401);
<<<<<<< HEAD
    t.end();
});

// Preferences tests

tap.test('GET /users/preferences', async (t) => {
    const response = await server.get('/users/preferences').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'preferences');
    t.same(response.body.preferences, mockUser.preferences);
    t.end();
});

tap.test('GET /users/preferences without token', async (t) => {
    const response = await server.get('/users/preferences');
    t.equal(response.status, 401);
    t.end();
});

tap.test('PUT /users/preferences', async (t) => {
    const response = await server.put('/users/preferences').set('Authorization', `Bearer ${token}`).send({
        preferences: ['movies', 'comics', 'games']
    });
    t.equal(response.status, 200);
});

tap.test('Check PUT /users/preferences', async (t) => {
    const response = await server.get('/users/preferences').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.same(response.body.preferences, ['movies', 'comics', 'games']);
    t.end();
=======
});

// Preferences tests
tap.test('GET /users/preferences', async (t) => {
    t.plan(2);
    console.log(`Token: ${token}`);
    const response = await server.get('/users/preferences').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.same(response.body.preferences, mockUser.preferences);
});

tap.test('GET /users/preferences without token', async (t) => {
    t.plan(1);
    const response = await server.get('/users/preferences');
    t.equal(response.status, 401);
});

tap.test('PUT /users/preferences', async (t) => {
    t.plan(1);
    const response = await server.put('/users/preferences')
        .set('Authorization', `Bearer ${token}`)
        .send({ preferences: ['movies', 'comics', 'games'] });
    t.equal(response.status, 200);
});

tap.test('Check PUT /users/preferences update', async (t) => {
    t.plan(2);
    const response = await server.get('/users/preferences').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.same(response.body.preferences, ['movies', 'comics', 'games']);
>>>>>>> master
});

// News tests

tap.test('GET /news', async (t) => {
<<<<<<< HEAD
    const response = await server.get('/news').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'news');
    t.end();
});

tap.test('GET /news without token', async (t) => {
    const response = await server.get('/news');
    t.equal(response.status, 401);
    t.end();
});



tap.teardown(() => {
    process.exit(0);
});
=======
    t.plan(2);
    const response = await server.get('/news').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'news');
});

tap.test('GET /news without token', async (t) => {
    t.plan(1);
    const response = await server.get('/news');
    t.equal(response.status, 401);
});

tap.teardown(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
>>>>>>> master
