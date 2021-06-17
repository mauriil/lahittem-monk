const path = require('path');
const config = require('config');
const express = require('express');
const routes = require('../routes/index');
const app = express();
const io = require('socket.io-client');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

app.set('port', config.get('WEB_SERVER_PORT') || 8080);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v1', routes);
server = app.listen(app.get('port'));      

describe('WebSocket Server', function() {
  describe('#Conection', function() {

    it('should connect to server as a websocket client and write something', function() {
      const client = io();
      client.emit('new:keyPair', 'message');
    });

  });
});


describe('API REST', function() {  
  chai.use(chaiHttp);
  const url= `${config.get('SERVER_URL')}:${config.get('WEB_SERVER_PORT')}`;

  describe('#404 OK', function() {    
    it('should respond that not exist that key', function() { 
      chai.request(url)
      .get('/v1/key/test')
      .end( function(err,res){
      expect(res).to.have.status(404);
      done();
      });
      
    });    
  });

  describe('#Closing', function () {
    it('should close the server ', function() { 
      server.close();
    });
  });
});

