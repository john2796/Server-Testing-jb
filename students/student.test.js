
const request = require('supertest');
const knex = require('knex');
const dbConfig = require('../knexfile');

const server = require('../server');

const db = knex(dbConfig.development);


describe('tools CRUD operations', () => {
  afterEach(async () => {
    await db('students').truncate();
  });
});


describe('get routes', () => {
  it('should return a status code of 200 upon success', async (done) => {
    const response = await request(server).get('/api/students');

    expect(response.status).toBe(200);

    done();
  });


  it('should return a status code of 200 upon success for individual students', async (done) => {
    await request(server).post('/api/students').send({
      name: 'jb',
      cohort: 'cohort',
      id: 1,
    });

    const response = await request(server).get('/api/students/1');

    expect(response.status).toBe(200);

    done();
  });
});
