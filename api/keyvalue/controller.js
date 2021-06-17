const logger = require('../../services/winston');
const fs = require('fs');
const config = require('config');
let storedJson = (config.get('JSON_FILE'));

module.exports = {

    async getKeyValue(req, res) {
        dataInJson = JSON.parse(fs.readFileSync(storedJson));
        let receivedKey = req.params.key;

        if (dataInJson.hasOwnProperty(receivedKey)) {
            res.status(200).json({"value":dataInJson[receivedKey]});
            logger.info(`Server sent '${dataInJson[receivedKey]}' value for ${receivedKey}` );
        }else{            
            res.status(404).json({"value":"Key not found"});
            logger.error(`404 - ${res.statusMessage} (Provided Key not found) -  ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    },

}