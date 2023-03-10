'use strict';
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes/index')
const mongoUtil = require('./db/connection')
const fileUpload = require('express-fileupload');

const PORT = 3000

mongoUtil.connectToServer().then(
    async () => {
      try {
        console.log('Connected to Mongo');
      } catch (error) {
        console.log('Mongo Connection failed', err);
      }
    }  
  );

const app = express();
app.use(cors());
app.use(fileUpload({}));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json());
global.appRootDirectory = __dirname;

app.use('/user', routes);

let server = app.listen(PORT, ()=>{
     console.log("server started on port",PORT); 
});

module.exports = app; 
