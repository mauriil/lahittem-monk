/* eslint-disable linebreak-style */
const path = require('path');
const config = require('config');
const express = require('express');
const fs = require('fs');
const routes = require('./routes/index');
const logger = require('./services/winston');

const app = express();

const storedJson = (config.get('JSON_FILE'));

try {
  if (!fs.existsSync('./data')) {
    fs.mkdir(path.join(__dirname, 'data'), (err) => {
      if (err) {
        logger.error(err);
      }
      logger.debug('Directory created successfully!');
    });
  }

  if (!fs.existsSync(storedJson)) {
    fs.writeFile(storedJson, '{}', (err) => {
      if (err) logger.error('Error creating data file', err);
    });
  }
} catch (err) {
  logger.error('Error creating directories: ', err);
}

app.set('port', config.get('WEB_SERVER_PORT') || 8080);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v1', routes);

try {
  const server = app.listen(app.get('port'), () => {
    logger.debug(`Server up and running on port: ${app.get('port')}`);
  });

  // eslint-disable-next-line global-require
  const ioServer = require('socket.io')(server);
  ioServer.on('connection', (socket) => {
    logger.debug(`New socket connection, id: ${socket.id}`);
    socket.on('new:keyPair', (data) => {
      const dataInJson = JSON.parse(fs.readFileSync(storedJson));
      dataInJson[data.key] = data.value;
      fs.writeFile(storedJson, JSON.stringify(dataInJson), (err) => {
        if (err) {
          logger.error('Failed to write data, err: ', err);
        } else {
          logger.info(`New key value stored ${data.key}: ${data.value}`);
          logger.debug('Key value pair stored succesfuly');
        }
      });
    });
  });
} catch (err) {
  logger.error('Error handling server: ', err);
}
