const logger = require('../../librarys/logger');

module.exports = function (tip) {
  if (tip.includes('说：')) {
    return;
  }

  if (tip.includes('精力不够')) {
    logger.info(`「${this.userConfig.name}」副本任务完成`);
    this.cmd.send(`taskover signin,taskover zz1,taskover zz2`);
    this.nowTask = 'tower';
    this.attach(this.towerEvents);
    this.cmd.send(this.gameInfo.tower.way);
  }

  if (tip.includes('完成度未满')) {
    this.dungeonNum++;
    if (this.dungeonNum < 20) {
      this.cmd.send(this.dungeon);
    } else {
      logger.info(`「${this.userConfig.name}」副本任务完成`);
      this.cmd.send(`taskover signin,taskover zz1,taskover zz2`);
      this.nowTask = 'tower';
      this.attach(this.towerEvents);
      this.cmd.send(this.gameInfo.tower.way);
    }
  }
};
