const fs = require('fs');
const chalk = require('chalk');
const dayjs = require('dayjs');
const { EOL } = require('os');

dayjs.locale('zh-cn');

function print(msg, type = 'info') {
  const color = {
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'blue',
    debug: 'cyan',
  };

  const logMsg = `${dayjs().format('YYYY-MM-DD HH:mm:ss')} [${chalk[color[type]](type)}] ${msg}`;
  fs.appendFileSync('daily.log', logMsg + EOL);
  console.log(logMsg);
}

function success(msg) {
  print(msg, 'success');
}

function warning(msg) {
  print(msg, 'warning');
}

function error(msg) {
  print(msg, 'error');
}

function info(msg) {
  print(msg);
}

function debug(msg) {
  print(msg, 'debug');
}

module.exports = {
  success,
  warning,
  error,
  info,
  debug,
};
