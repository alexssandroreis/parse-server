const express = require('express'),
      ParseServer = require('parse-server').ParseServer,
      path = require('path'),
      http = require('http');

const api = new ParseServer({
  databaseURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/dev',
  //cloud: __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'default_app_id',
  masterKey: process.env.MASTER_KEY || 'empty_key', 
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse'
});

const app = express();
const mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

const port = process.env.PORT || 1337;
const httpServer = http.createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server running on port ' + port + '.');
});
