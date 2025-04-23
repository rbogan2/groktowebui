import chalk from 'chalk';
import moment from 'moment';

const LogLevel = {
INFO: 'INFO',
WARN: 'WARN',
ERROR: 'ERROR',
DEBUG: 'DEBUG'
};

class Logger {
static formatMessage(level, message) {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  
  switch(level) {
    case LogLevel.INFO:
      return chalk.blue(`[${timestamp}] [${level}] ${message}`);
    case LogLevel.WARN:
      return chalk.yellow(`[${timestamp}] [${level}] ${message}`);
    case LogLevel.ERROR:
      return chalk.red(`[${timestamp}] [${level}] ${message}`);
    case LogLevel.DEBUG:
      return chalk.gray(`[${timestamp}] [${level}] ${message}`);
    default:
      return message;
  }
}

static info(message, context) {
  console.log(this.formatMessage(LogLevel.INFO, context ? `[${context}] ${message}` : message));
}

static warn(message, context) {
  console.warn(this.formatMessage(LogLevel.WARN, context ? `[${context}] ${message}` : message));
}

static error(message, context, error = null) {
  const errorMessage = error ? ` - ${error.message}` : '';
  console.error(this.formatMessage(LogLevel.ERROR, `${context ? `[${context}] ` : ''}${message}${errorMessage}`));
}

static debug(message, context) {
  if (process.env.NODE_ENV === 'development') {
    console.debug(this.formatMessage(LogLevel.DEBUG, context ? `[${context}] ${message}` : message));
  }
}

static requestLogger(req, res, next) {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logMessage = `${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`;
    
    if (res.statusCode >= 400) {
      Logger.error(logMessage, undefined, 'HTTP');
    } else {
      Logger.info(logMessage, 'HTTP');
    }
  });

  next();
}
}

export default Logger;
