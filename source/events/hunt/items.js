const { pfm } = require('../../utils/timers');

module.exports = function (data) {
  for (const item of data.items) {
    if (!item || item.p || !item.name) {
      continue;
    }

    if (item.name === this.gameInfo.hunt.npc) {
      this.huntTaskInfo.taskerId = item.id;
      this.cmd.send(`ask1 ${item.id}`);
      return;
    }

    if (item.name === `<red>衙门逃犯</red> ${this.huntTaskInfo.name}`) {
      this.timers.pfm = setInterval(pfm.bind(this), 500);
      this.cmd.commandClear();
      this.cmd.send(`kill ${item.id}`, false);
      return;
    }

    if (item.name === '铁匠铺老板 铁匠') {
      this.cmd.send(`list ${item.id}`);
      return;
    }
  }

  if (
    this.nowRoomId !== this.gameInfo.temple.pathId &&
    !this.cmd.hasCommand()
  ) {
    this.cmd.send(this.gameInfo.hunt.path[this.huntTaskInfo.place]);
  }
};
