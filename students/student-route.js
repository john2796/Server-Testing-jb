const server = require('express').Router();
const db = require('../data/dbConfig');

const getAllStudents = async (req, res) => {
  try {
    const student = await db.select().from('students');
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

server.get('/', (req, res) => {
  getAllStudents(req, res);
});
server.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await db.select().from('students').where({ id }).first();
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'student not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


server.post('/', async (req, res) => {
  const { name, cohort } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'name is not found' });
  }
  if (!cohort) {
    return res.status(400).json({ message: 'name is not found' });
  }
  try {
    const [id] = await db.insert({ name, cohort }).into('students');
    const student = await db.select().from('students').where({ id }).first();
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
server.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db.delete({ id }).from('students').where({ id });
    if (deleted) {
      getAllStudents(req, res);
    } else {
      res.status(404).json({ message: 'student not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

server.put('/:id', async (req, res) => {
  const { name, cohort } = req.body;
  const { id } = req.params;

  try {
    const updated = await db.update({ name, cohort }).from('students').where({ id });
    if (updated) {
      getAllStudents(req, res);
    } else {
      res.status(404).json({ message: 'student not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = server;
