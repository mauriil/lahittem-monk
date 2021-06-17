const path = require('path');
const config = require('config');
const express = require('express');
const routes = require('./routes/index');
const app = express();
const fs = require('fs');
const logger = require('./services/winston');
let storedJson = (config.get('JSON_FILE'));

if (!fs.existsSync(storedJson)){
    fs.writeFile(storedJson, "{}", function(err, result) {
        if(err) console.log('error creating data file', err);
    });
}

app.set('port', config.get('WEB_SERVER_PORT') || 8080);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v1', routes);

const server = app.listen(app.get('port'), () => {
    logger.info(`Server bound on port: ${app.get('port')}`);
});


const ioServer = require('socket.io')(server);
ioServer.on('connection', socket =>{
    //socket.write('Connected, you can now send key-value pair to store')
    logger.info(`New socket connection, id: ${socket.id}`);

    socket.on('new:keyPair', data =>{
        dataInJson = JSON.parse(fs.readFileSync(storedJson))
        dataInJson[data.key] = data.value;
        
        fs.writeFile(storedJson, JSON.stringify(dataInJson), (err) => {
            if (err) {
                logger.error('Failed to write data, err: ', err);
            } else{
                logger.info('Key value stored');
            } 
        });
    });
});
