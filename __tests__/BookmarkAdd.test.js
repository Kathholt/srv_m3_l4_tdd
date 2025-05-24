const app = require('../app');
const request = require('supertest');

it('Add a bookmark for a logged in user.', async () => {
  const userInformation = await request(app).post('/users/login').send({
    username: 'teacher007',
    password: 'asecret',
  });

  let token = JSON.parse(userInformation.text).data.token;

  const response = await request(app).post('/bookmarks').set('Authorization', `Bearer ${token}`).send({ Name: 'New Bookmark', URL: 'http://localhost:3000' });
  expect(response.statusCode).toBe(201);
  expect(response.body).toHaveProperty('message', 'Bookmark created successfully');
});

afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 100)); // optional wait
    await require('../models').sequelize.close(); // clean DB connection
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 100)); // optional wait
    await require('../models').sequelize.close(); // clean DB connection
  });