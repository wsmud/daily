const logger = require('../../librarys/logger');

module.exports = function (tip) {
  logger.debug(`「${this.userConfig.name}」${tip}`);
  if (tip.includes('有人使用你的角色从别的地址登陆游戏')) {
    logger.warning(`「${this.userConfig.name}」被顶号`);
    this.socketClose();
  }
};
