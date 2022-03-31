const logger = require('../../librarys/logger');

module.exports = function (data) {
  logger.debug(`「${this.userConfig.name}」当前房间：${data.name}`);
};
