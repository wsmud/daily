const logger = require('../../librarys/logger');

module.exports = function (tip) {
  if (tip.includes('说：')) {
    return;
  }

  if (tip.includes('你的扫荡符不够')) {
    this.cmd.send(`shop 0 20;ask3 ${this.huntTaskInfo.taskerId}`);
  }

  if (tip.includes('大于你的最大连续次数')) {
    this.cmd.send(
      `ask1 ${this.huntTaskInfo.taskerId};ask2 ${this.huntTaskInfo.taskerId};ask3 ${this.huntTaskInfo.taskerId}`,
    );
  }

  if (tip.includes('听说他最近在')) {
    const reg = tip.match(
      /程药发对你说道：(.+?)作恶多端，还请.+?为民除害，听说他最近在(.+?)-.+?出现过。/,
    );
    this.huntTaskInfo.name = reg[1];
    this.huntTaskInfo.place = reg[2];
    if (!this.gameInfo.hunt.path[this.huntTaskInfo.place]) {
      logger.warning(
        `「${this.userConfig.name}」无法获取逃犯路径，逃犯位置为为「${this.huntTaskInfo.place}」`,
      );
      this.cmd.send(`ask2 ${this.huntTaskInfo.taskerId};ask1 ${this.huntTaskInfo.taskerId}`);
      return;
    }

    this.cmd.send(this.gameInfo.hunt.path[this.huntTaskInfo.place]);
  }

  if (/你的追捕任务完成了|你的追捕任务失败了/.test(tip)) {
    if (tip.includes('失败了')) {
      this.huntTaskInfo.taskFailedNum++;
    }

    if (this.huntTaskInfo.cai) {
      logger.info(`「${this.userConfig.name}」追捕任务已完成`);
      this.cmd.send(
        /ord|hio/.test(this.userLevel)
          ? 'jh fam 0 start;go west;go west;go north;go enter;go west;xiulian'
          : 'wakuang',
      );
      return;
    }

    this.cmd.commandClear();
    this.cmd.send(this.gameInfo.hunt.way);
  }

  if (tip.includes('你不是在追捕吗')) {
    this.huntTaskInfo.taskFailedNum++;
    if (this.huntTaskInfo.taskFailedNum >= 3) {
      this.huntTaskInfo.cai = true;
      this.cmd.send(`ask3 ${this.huntTaskInfo.taskerId}`);
      return;
    }

    this.cmd.send(`ask2 ${this.huntTaskInfo.taskerId};ask1 ${this.huntTaskInfo.taskerId}`);
  }

  if (tip.includes('最近没有在逃的逃犯了')) {
    logger.info(`「${this.userConfig.name}」追捕任务已完成`);
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
};
