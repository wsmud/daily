const timers = require('../../utils/timers');

module.exports = function (data) {
  for (const item of data.items) {
    if (!item || item.p || !item.name) {
      continue;
    }

    if (item.name === this.gameInfo.tower.npc) {
      this.cmd.send(`ask1 ${item.id};go enter`);
      this.timers.up = setInterval(timers.up.bind(this), 3e3);
    }

    if (item.name.includes(this.gameInfo.tower.guardianTitle)) {
      this.towerGuardianId = item.id;
      this.cmd.send(`kill ${item.id}`);
    }

    if (item.name.includes('ord')) {
      clearInterval(this.timers.pfm);
      clearInterval(this.timers.up);
      this.cmd.send(this.gameInfo.bank.way);
    }
  }
};
