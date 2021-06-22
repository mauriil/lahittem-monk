const path = require('path');
const config = require('config');
const express = require('express');

const app = express();
const io = require('socket.io-client');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const routes = require('../routes/index');

app.set('port', config.get('WEB_SERVER_PORT') || 8080);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v1', routes);
const server = app.listen(app.get('port'));

describe('WebSocket Server', () => {
  describe('#Conection', () => {
    it('should connect to server as a websocket client and write something', () => {
      const client = io();
      client.emit('new:keyPair', 'message');
    });
  });
});

describe('API REST', () => {
  chai.use(chaiHttp);
  const url = `${config.get('SERVER_URL')}:${config.get('WEB_SERVER_PORT')}`;

  describe('#404 OK', () => {
    it('should respond that not exist that key', () => {
      chai.request(url)
        .get('/v1/key/test')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('#Closing', () => {
    it('should close the server ', () => {
      server.close();
    });
  });
});
