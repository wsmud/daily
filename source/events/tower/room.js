const logger = require('../../librarys/logger');

module.exports = function (data) {
  this.isCombat = false;
  this.nowRoomId = data.path;
  switch (data.path) {
    case this.gameInfo.temple.pathId:
      setTimeout(() => this.cmd.send(this.gameInfo.tower.way), 3e4);
      break;
    case this.gameInfo.bank.pathId:
      this.cmd.send('pack');
      break;
    default:
      break;
  }
};
