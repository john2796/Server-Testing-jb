require('dotenv').config();
const server = require('./server');

// for heroku
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`
  ---------------------------------------------------------------
          server is listening on port ${PORT}
  ---------------------------------------------------------------
                    
  `));
