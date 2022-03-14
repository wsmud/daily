const logger = require('../../librarys/logger');

module.exports = function (data) {
  logger.success(`「${this.userConfig.name}」登录成功`);
  this.userId = data.id;
  this.cmd.send('score');
};
