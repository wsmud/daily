const chalk = require('chalk');
const dayjs = require('dayjs');

dayjs.locale('zh-cn');

function print(msg, type = 'info') {
  const color = {
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'blue',
    debug: 'cyan',
  };

  console.log('%s [%s]: %s', dayjs().format('YYYY-MM-DD HH:mm:ss'), chalk[color[type]](type), msg);
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
}
