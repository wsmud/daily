const logger = require('../../librarys/logger');

module.exports = function () {
  logger.error(`「${this.userConfig.name}」登录失败`);
  this.socketClose();
};
