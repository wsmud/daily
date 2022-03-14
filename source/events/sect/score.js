const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const logger = require('../../librarys/logger');
const { sect } = yaml.load(fs.readFileSync(path.resolve(__dirname, '../../utils/gameInfo.yaml')));

module.exports = function (data) {
  const userSect = sect.find(({ name }) => name === data.family);
  if (!userSect) {
    logger.error(`「${this.userConfig.name}」无法确认用户门派，用户门派为「${data.family}}」`);
    return this.socketClose();
  }
  this.sect = userSect;
  this.cmd.send(`stopstate;${this.sect.taskerWay}`);
};
