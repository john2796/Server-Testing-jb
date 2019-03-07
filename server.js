const express = require("express");
const helmet = require("helment");
const logger = require("morgan")
const cors = require("cors")
const server = express();



//middleware
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger('dev'));



// for heroku
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`
  ---------------------------------------------------------------
          server is listening on port ${PORT}
  ---------------------------------------------------------------
                    
  `)
})