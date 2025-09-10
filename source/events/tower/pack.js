const logger = require('../../librarys/logger');

module.exports = function (data) {
  if (this.nowRoomId !== this.gameInfo.bank.pathId || !data.items) {
    return;
  }

  const storeList = data.items.filter((item) => {
    return item && /突破|(?<!武道)残页/.test(item.name);
  });

  storeList.forEach((item) => this.cmd.send(`store ${item.count} ${item.id}`));
  this.nowTask = this.userConfig.sectDungeon
    ? 'sectDungeon'
    : this.userConfig.jindi
    ? 'jindi'
    : this.userConfig.yaota
    ? 'yaota'
    : 'dungeon';
  this.attach(
    this.userConfig.sectDungeon
      ? this.sectDungeonEvents
      : this.userConfig.jindi
      ? this.jindiEvents
      : this.userConfig.yaota
      ? this.yaotaEvents
      : this.dungeonEvents,
  );
  this.cmd.send('tasks');
  logger.info(`「${this.userConfig.name}」武道塔任务完成`);
};
