const logger = require('../../librarys/logger');

module.exports = function (data) {
  if (this.nowRoomId !== this.gameInfo.bank.pathId || !data.items) {
    return;
  }

  const storeList = data.items.filter((item) => {
    return item && /突破|(?<!武道)残页/.test(item.name);
  });

  storeList.forEach((item) => this.cmd.send(`store ${item.count} ${item.id}`));
  this.nowTask = this.userConfig.sectDungeon && !this.dungeonOver ? 'sectDungeon' : 'hunt';
  this.attach(
    this.userConfig.sectDungeon && !this.dungeonOver ? this.sectDungeonEvents : this.huntEvents,
  );
  this.cmd.send(
    this.userConfig.sectDungeon && !this.dungeonOver
      ? 'jh fam 9 start;go enter;go up'
      : this.gameInfo.hunt.way,
  );
  logger.info(`「${this.userConfig.name}」武道塔任务完成`);
};
