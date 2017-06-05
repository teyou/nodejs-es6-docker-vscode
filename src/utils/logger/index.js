var winston = require('winston'),
  fs = require('fs'),
  util = require('util'),
  logDir = 'logs', // Or read from a configuration
  env = process.env.NODE_ENV || 'development',
  logger;
require('winston-daily-rotate-file');

//winston.setLevels(winston.config.npm.levels);
winston.addColors(winston.config.npm.colors);

var fixWinstonParams = function(fn) {
  return function() {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] === 'object') {
        arguments[i] = JSON.stringify(arguments[i], null, 2);
      } else {
        arguments[i] = util.format(arguments[i]);
      }
    }
    return fn.apply(this, arguments);
  };
};

if (!fs.existsSync(logDir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDir);
}

//console.log('winstonDbConfig', winstonDbConfig);

logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      colorize: true
    }),
    new winston.transports.DailyRotateFile({
      name: 'info-file',
      level: env === 'development' ? 'debug' : 'info',
      filename: logDir + '/.log',
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      maxsize: 1024 * 1024 * 10 // 10MB
    }),
    new winston.transports.DailyRotateFile({
      name: 'error-file',
      level: 'error',
      filename: logDir + '/error.log',
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      maxsize: 1024 * 1024 * 10 // 10MB
    })
    //new winston.transports.Mysql(winstonDbConfig)
  ],
  exceptionHandlers: [
    new winston.transports.DailyRotateFile({
      filename: logDir + '/exceptions.log',
      datePattern: 'yyyy-MM-dd.',
      prepend: true
    })
  ]
});

//logger.info('logger setup completed');

// ['info', 'error', 'debug', 'warn'].map(function(each) {
//   logger[each] = fixWinstonParams(logger[each]);
// });

module.exports = logger;

// Use this singleton instance of logger like:
// logger = require( 'path to lib/logger.js' );
// logger.debug( 'your debug statement' );
// logger.warn( 'your warning' );
// levels:  { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
