const logger = require('../../librarys/logger');

module.exports = function (tip) {
  logger.debug(`「${this.userConfig.name}」${tip}`);
};
