const logger = require('../../librarys/logger');

module.exports = function (tip) {
  if (tip.includes('说：')) {
    return;
  }

  if (/打败我|你要进入哪个副本|没有那么多的元宝/.test(tip)) {
    logger.warning(`「${this.userConfig.name}」古宗门任务失败`);
    this.nowTask = 'hunt';
    this.attach(this.huntEvents);
    this.cmd.send(this.gameInfo.hunt.way);
  }

  if (tip.includes('扫荡完成')) {
    logger.info(`「${this.userConfig.name}」古宗门任务完成`);
    this.nowTask = 'hunt';
    this.attach(this.huntEvents);
    this.cmd.send(this.gameInfo.hunt.way);
  }

  if (tip.includes('你的扫荡符不够')) {
    this.cmd.send(`shop 0 5;cr gmp/shanmen 0 5`);
  }
};
