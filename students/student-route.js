const server = require('express').Router();
const db = require('../data/dbConfig');


server.get('/', async (req , res) => {
  try {
    const student = await db.select().from('students');
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = server;
