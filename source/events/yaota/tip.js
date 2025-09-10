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

  if (/你的精力不够|打败我|你要进入哪个副本|没有那么多的元宝/.test(tip)) {
    logger.warning(`「${this.userConfig.name}」妖塔任务失败`);

    this.nowTask = this.userConfig.jindi ? 'jindi' : 'dungeon';
    this.attach(this.userConfig.jindi ? this.jindiEvents : this.dungeonEvents);
    this.cmd.send(
      this.nowTask === 'dungeon' ? 'tasks' : 'jh fam 9 start;go enter;go up',
    );
  }

  if (tip.includes('快速完成弑妖塔，共获得了')) {
    const nowJing = Number(tip.match(/一个扫荡符，(\d+)精力快速完成弑妖塔/)[1]);
    this.yaotaJing += nowJing;
    if (this.yaotaJing >= 200) {
      logger.info(`「${this.userConfig.name}」妖塔任务完成`);
      this.nowTask = 'dungeon';
      this.attach(this.dungeonEvents);
      this.cmd.send('tasks');
    } else {
      this.cmd.send('saodang muyuan');
    }
  }

  if (tip.includes('你的扫荡符不够')) {
    this.cmd.send(`shop 0 1;saodang muyuan`);
  }
};
