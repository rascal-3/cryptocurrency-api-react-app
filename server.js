const http = require('http');
const path = require('path');
const cors = require('cors');
const express = require('express');
const request = require('superagent');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
// app.use(cors());

app.get('/api/bf/board', (req, res, next) => {
  const self = this;
  request.get('https://api.bitflyer.jp/v1/board')
  .end((error, response) => {
    if (error) {
      console.log(error);
    } else if (response.ok) {
      console.log('GET board OK!!');
      res.send(response.body);
      next();
    }
  });
});

server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", () => {
  const addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
