const logger = require('../../librarys/logger');

module.exports = function (data) {
  if (!data.items) {
    return;
  }

  const storeList = data.items.filter((item) => {
    return item && /突破|(?<!武道)残页/.test(item.name);
  });

  storeList.forEach((item) => this.cmd.send(`store ${item.count} ${item.id}`));
  this.nowTask = 'hunt';
  this.attach(this.huntEvents);
  this.cmd.send(this.gameInfo.hunt.way);
  logger.info(`「${this.userConfig.name}」武道塔任务完成`);
};
