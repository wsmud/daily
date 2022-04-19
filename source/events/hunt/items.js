const { fix } = require('../../utils/timers');

module.exports = function (data) {
  clearTimeout(this.timers.fix);

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
      this.cmd.commandClear();
      this.cmd.send(`kill ${item.id}`, false);
      return;
    }

    if (item.name === '铁匠铺老板 铁匠') {
      this.cmd.send(`list ${item.id}`);
      return;
    }
  }

  if (this.huntTaskInfo.place && this.huntTaskInfo.nowTaskWay.length < 1) {
    this.huntTaskInfo.nowTaskWay = JSON.parse(
      JSON.stringify(this.gameInfo.hunt.path[this.huntTaskInfo.place].split(';')),
    );
  }

  if (this.nowRoomId !== this.gameInfo.temple.pathId) {
    const cmd = this.huntTaskInfo.nowTaskWay.shift();
    this.cmd.send(cmd);
    cmd === 'break bi' && this.cmd.send(this.huntTaskInfo.nowTaskWay.shift(), false);
    this.timers.fix = setTimeout(fix.bind(this), 6e4);
  }
};
