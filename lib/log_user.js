const winston = require('winston');
const { format } = require('winston');
const { timestamp, printf } = format;


const myFormat = printf(({ level, message, id, timestamp=timestamp}) => {
    return JSON.stringify({
        level: level,
        time: timestamp,
        id: id,
        message: message
    });
});

const logger = winston.createLogger({
    format: format.combine(
        format.json(),
        format.label({
            ip: req.ip
        }),
        timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.File({
            filename: './log/debug.log',
            level: 'debug'
        }),
        new winston.transports.File({
            filename: './log/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: './log/combined.log'
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = function(req, res, next) {

    next()
};



