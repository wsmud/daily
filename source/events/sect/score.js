const logger = require('../../librarys/logger');

module.exports = function (data) {
  const userSect = this.gameInfo.sect.find(({ name }) => name === data.family);
  if (!userSect) {
    logger.error(`「${this.userConfig.name}」无法确认用户门派，用户门派为「${data.family}}」`);
    return this.socketClose();
  }
  this.sect = JSON.parse(JSON.stringify(userSect));
  this.userLevel = data.level;
  this.cmd.send(`stopstate;${this.sect.taskerWay}`);
};
