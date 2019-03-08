
const request = require('supertest');
const knex = require('knex');
const dbConfig = require('../knexfile');

const server = require('../server');

const db = knex(dbConfig.development);


describe('STUDENTS CRUD operations', () => {
  afterEach(async () => {
    await db('students').truncate();
  });
});


describe('-------------------------------GET ROUTE-------------------------------', () => {
  it('[ GET 200 ]should return a status code of 200 upon success', async (done) => {
    const response = await request(server).get('/api/students');

    expect(response.status).toBe(200);

    done();
  });
  //------------------------------------------------------------------------------------
  it('[ GET ] should return an array of students', async () => {
    const response = await request(server).get('/api/students');

    expect(Array.isArray(response.body)).toBe(true);
  });
  //------------------------------------------------------------------------------------

  it('[ GET/:id 200 ]should return a status code of 200 upon success for individual students', async (done) => {
    await request(server).post('/api/students').send({
      name: 'name',
      cohort: 'web16',
      id: 1,
    });

    const response = await request(server).get('/api/students/1');
    expect(response.status).toBe(200);

    done();
  });

  //------------------------------------------------------------------------------------
  it('[ GET/:id 404 ]  should return 404 if student is not found', async () => {
    const response = await request(server).get('/api/students/10000');
    expect(response.status).toBe(404);
  });
});


describe('------------------------------- POST ROUTE -------------------------------', () => {
  //------------------------------------------------------------------------------------
  it('[ POST 200 ] should return 200  ', async (done) => {
    const response = await request(server).post('/api/students').send({
      name: 'jb 1', cohort: 'cohort 1',
    });

    expect(response.status).toBe(200);

    done();
  });
  it('[ POST 400 ] should return 400 if body is invalid  ', async (done) => {
    const response = await request(server).post('/api/students').send({
      name: undefined, cohort: undefined,
    });

    expect(response.status).toBe(400);

    done();
  });
  // it('[ POST 401 ] should return 401 if not logged in  ', async (done) => {
  //   const response = await request(server).post('/api/students').send({
  //     name: undefined, cohort: undefined,
  //   });

  //   expect(response.status).toBe(400);

  //   done();
  // });
});
//------------------------------------------------------------------------------------
describe('------------------------------- DELETE ROUTE------------------------------- ', () => {
  //------------------------------------------------------------------------------------
  it('[ DELETE ] should delete the student with the specified id', async () => {
    await request(server).post('/api/students/').send({
      name: 'mikko',
      cohort: 'web16',
    });
    await request(server).delete('/api/students/1');
    const response = await request(server).get('/api/students/1');
    expect(response.status).toBe(404);
  });
  //------------------------------------------------------------------------------------
  it('[ DELETE 200 ] should give status of 200', async () => {
    await request(server).post('/api/students/').send({
      name: 'mikko',
      cohort: 'web16',
    });
    const response = await request(server).delete('/api/students/2');
    expect(response.status).toBe(200);
  });
  //------------------------------------------------------------------------------------
  it('[ DELETE 404 ]should give status of 404 if student does not exist', async () => {
    await request(server).post('/api/students/').send({
      name: 'mikko',
      cohort: 'web16',
    });
    const response = await request(server).delete('/api/students/1230');
    expect(response.status).toBe(404);
  });
});
//------------------------------------------------------------------------------------
describe('------------------------------- PUT ROUTE-------------------------------', () => {
  //------------------------------------------------------------------------------------
  it('[ PUT  ] should update student name', async () => {
    await request(server).post('/api/students/').send({
      name: 'mikko',
      cohort: 'web16',
    });
    await request(server).put('/api/students/3').send({
      name: 'new name',
    });
    const response = await request(server).get('/api/students/3');
    expect(response.body.name).toBe('new name');
  });
  // ------ ------------------------------------------------------------------------------
  // it('[ PUT 403 ] should return 403 if user is not logged in', async () => {
  //   await request(server).post('/api/students/').send({
  //     name: 'mikko',
  //     cohort: 'web16',
  //   }).set('Authorization', token);;

  //   const response = await request(server).put('/api/students/1').send({
  //     name: 'new name',
  //   }).set('Authorization', token);

  //   expect(response.status).toBe(403);
  // });
});
