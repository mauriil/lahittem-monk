//const linksModel = require('../devices/models/DB_links_model');
//const logger = require('../../services/loger');
const fs = require('fs');
const config = require('config');
let storedJson = (config.get('JSON_FILE'));

module.exports = {

    async getKeyValue(req, res) {
        dataInJson = JSON.parse(fs.readFileSync(storedJson));
        let receivedKey = req.params.key;

        if (dataInJson.hasOwnProperty(receivedKey)) {
            res.status(200).json({"value":dataInJson[receivedKey]});
        }else{
            res.status(404).json({"value":"Key not found"});
        }
    },

}