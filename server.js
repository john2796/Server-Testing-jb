
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const server = express();

const students = require('./students/student-route');

// middleware
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger('dev'));

server.use('/api/students', students);


module.exports = server;
