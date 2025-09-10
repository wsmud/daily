const logger = require('../../librarys/logger');

module.exports = function (tip) {
  if (tip.includes('说：')) {
    return;
  }

  if (tip.includes('你身上东西太多了')) {
    logger.warning(`「${this.userConfig.name}」背包已满`);
    this.cmd.send(this.userConfig.logoutCommand, false);
    this.cmd.send(
      /ord|hio/.test(this.userLevel)
        ? 'jh fam 0 start;go west;go west;go north;go enter;go west;xiulian'
        : 'wakuang', false);
    logger.success(`「${this.userConfig.name}」退出登录`);
    this.socketClose();
  }

  if (/达到上限|精力不够|打败我|你要进入哪个副本|没有那么多的元宝/.test(tip)) {
    logger.warning(`「${this.userConfig.name}」禁地任务失败`);
    this.nowTask = this.userConfig.yaota ? 'yaota' : 'dungeon';
    this.attach(this.userConfig.yaota ? this.yaotaEvents : this.dungeonEvents);
    this.jindiField = true;
    this.cmd.commandClear();
    this.cmd.send('tasks');
  }

  if (tip.includes('扫荡完成')) {
    logger.info(`「${this.userConfig.name}」禁地任务完成`);
    if (!this.jindiField) {
      this.nowTask = this.userConfig.yaota ? 'yaota' : 'dungeon';
      this.attach(
        this.userConfig.yaota ? this.yaotaEvents : this.dungeonEvents,
      );
      this.cmd.send('tasks');
    }
  }

  if (tip.includes('你的扫荡符不够')) {
    this.cmd.send(`shop 0 2;cr yzjd/pingyuan 0 2`);
  }
};
