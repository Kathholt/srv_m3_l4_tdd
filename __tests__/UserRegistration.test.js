const app = require('../app');
const request = require('supertest');

it('Register a new user', async () => {
  const response = await request(app).post('/users').send({
    firstname: "Teacher",
    lastname: "Noroff",
    username: "teacher007",
    password: "asecret"
  })
  if (response.status == 200){
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User created successfully');
    expect(response.body).toHaveProperty('data.token');
  }
  if (response.status == 409){
    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty('error', 'Username already used');
  }
});
  
afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 100)); // optional wait
    await require('../models').sequelize.close(); // clean DB connection
  });