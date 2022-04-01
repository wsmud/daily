const logger = require('../../librarys/logger');

module.exports = function (data) {
  const userSect = this.gameInfo.sect.find(({ name }) => name === data.family);
  if (!userSect) {
    logger.error(`「${this.userConfig.name}」无法确认用户门派，用户门派为「${data.family}}」`);
    return this.socketClose();
  }

  const jingReg = data.jingli.match(/(\d+)\/(\d+)<hig>\(\+\d+\)<\/hig>/);

  if (jingReg[1] / jingReg[2] > 0.8) {
    logger.warning(`「${this.userConfig.name}」未使用精力已超过80%，请及时处理。`);
  }

  this.sect = JSON.parse(JSON.stringify(userSect));
  this.userLevel = data.level;
  this.cmd.send('stopstate');
  this.cmd.send(this.userConfig.loginCommand);
  this.cmd.send(this.sect.taskerWay);
};
