const logger = require('../../librarys/logger');

module.exports = function(tip) {
  if (tip.includes('说：')) {
    return;
  }

  if (tip.includes('你身上东西太多了')) {
    if (!this.dungeonMan) {
      this.cmd.send(
        `jh fam 0 start;go south;go east;sell all;${this.userConfig.dungeon} 20`,
      );
      this.dungeonMan = true;
    } else {
      logger.warning(`「${this.userConfig.name}」背包已满`);
      this.cmd.send(this.userConfig.logoutCommand, false);
      this.cmd.send(
        /ord|hio/.test(this.userLevel)
          ? 'jh fam 0 start;go west;go west;go north;go enter;go west;xiulian'
          : 'wakuang', false);
      logger.success(`「${this.userConfig.name}」退出登录`);
      this.socketClose();
    }
  }

  if (tip.includes('你没有那么多的元宝')) {
    logger.warning(`「${this.userConfig.name}」元宝不足`);
    logger.info(`「${this.userConfig.name}」副本任务完成`);
    this.cmd.send(
      `taskover signin;taskover zz1;taskover zz2;jh fam 0 start;go south;go east;sell all`,
    );
    this.nowTask = 'hunt';
    this.attach(this.huntEvents);
    this.cmd.send(this.gameInfo.hunt.way);
  }

  if (/精力不够|扫荡完成/.test(tip)) {
    logger.info(`「${this.userConfig.name}」副本任务完成`);
    this.cmd.send(
      `taskover signin;taskover zz1;taskover zz2;jh fam 0 start;go south;go east;sell all`,
    );
    this.nowTask = 'hunt';
    this.attach(this.huntEvents);
    this.cmd.send(this.gameInfo.hunt.way);
  }

  if (tip.includes('你的扫荡符不够')) {
    this.cmd.send(`shop 0 20;${this.userConfig.dungeon} 20`);
  }
};
