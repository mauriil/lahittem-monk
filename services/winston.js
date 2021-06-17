const config = require('config');
const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
transports:
    new transports.File({
    filename: config.get('LOG_FILE_DIR'),
    format:format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
});