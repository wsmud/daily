const logger = require('../../librarys/logger');

module.exports = function (data) {
  const signinTask = data.items.find((item) => item.id === 'signin');
  if (signinTask.desc.includes('200/200')) {
    logger.info(`「${this.userConfig.name}」副本任务完成`);
    this.cmd.send(
      `taskover signin;taskover zz1;taskover zz2;jh fam 0 start;go south;go east;sell all`,
    );
    this.dungeonOver = true;
    this.nowTask = 'tower';
    this.attach(this.towerEvents);
    this.cmd.send(this.gameInfo.tower.way);
  } else {
    this.cmd.send(`${this.userConfig.dungeon} 20`);
  }
};
