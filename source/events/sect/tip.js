const logger = require('../../librarys/logger');

module.exports = function (tip) {
  if (tip.includes('说：')) {
    return;
  }

  if (tip.includes('你去帮我找')) {
    this.sectTaskInfo.taskItem = tip.match(/<.+?>.+?<\/.+?>/)[0];
    const seller = this.gameInfo.store.find(({ goods }) =>
      goods.includes(this.sectTaskInfo.taskItem),
    );
    if (seller) {
      this.sectTaskInfo.seller = seller.seller;
      this.cmd.send(seller.way);
    } else {
      this.cmd.send(`task sm ${this.sectTaskInfo.taskerId}`);
    }
  }
  if (/师父让别人去找|你的师门任务完成了/.test(tip)) {
    this.cmd.send(`task sm ${this.sectTaskInfo.taskerId}`);
  }

  if (tip.includes('你拿不下那么多东西')) {
    logger.warning(`「${this.userConfig.name}」背包已满`);
    this.cmd.send(this.userConfig.logoutCommand);
    this.cmd.send(
      /ord|hio/.test(this.userLevel)
        ? 'jh fam 0 start;go west;go west;go north;go enter;go west;xiulian'
        : 'wakuang',
    );
  }

  if (tip.includes('你没有那么多的钱')) {
    logger.warning(`「${this.userConfig.name}」黄金不足`);
    this.cmd.send(this.userConfig.logoutCommand);
    this.cmd.send(
      /ord|hio/.test(this.userLevel)
        ? 'jh fam 0 start;go west;go west;go north;go enter;go west;xiulian'
        : 'wakuang',
    );
  }

  if (/你挥着铁镐开始认真挖矿|你盘膝坐下开始闭关修炼/.test(tip)) {
    this.socketClose();
    logger.success(`「${this.userConfig.name}」退出登录`);
  }

  if (/你先去休息一下吧/.test(tip)) {
    this.sect.tasker = null;
    logger.info(`「${this.userConfig.name}」师门任务完成`);
    this.cmd.send(this.sect.chiefWay);
  }
};
