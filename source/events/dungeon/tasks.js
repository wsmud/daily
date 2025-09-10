const logger = require('../../librarys/logger');

module.exports = function (data) {
  const signinTask = data.items.find((item) => item.id === 'signin');
  if (signinTask.desc.includes('200/200')) {
    logger.info(`「${this.userConfig.name}」副本任务完成`);
    this.cmd.send(
      `taskover signin;taskover zz1;taskover zz2;jh fam 0 start;go south;go east;sell all`
    );
    this.nowTask = 'hunt';
    this.attach(this.huntEvents);
    this.cmd.send(this.gameInfo.hunt.way);
  } else {
    const num = signinTask.desc
      .replace(/<.+?>/g, '')
      .match(/精力消耗：(\d+)\/200/)[1];
    let dungeonNum = 20 - Math.floor(num / 10);
    dungeonNum = dungeonNum < 2 ? 2 : dungeonNum;
    if (!this.userConfig.yaota && !this.userConfig.jindi) {
      this.cmd.send(
        `${this.userConfig.dungeon} ${
          this.userConfig.dungeonNum ? this.userConfig.dungeonNum : 20
        }`
      );
    } else {
      this.cmd.send(`${this.userConfig.dungeon} ${dungeonNum}`);
    }
  }
};
