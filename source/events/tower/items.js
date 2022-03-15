const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const timers = require('../../utils/timers');
const { bank, tower } = yaml.load(
  fs.readFileSync(path.resolve(__dirname, '../../utils/gameInfo.yaml')),
);

module.exports = function (data) {
  for (const item of data.items) {
    if (item.p || !item.name) {
      continue;
    }

    if (item.name === tower.npc) {
      this.cmd.send(`ask1 ${item.id};go enter`);
      this.timers.up = setInterval(timers.up.bind(this), 3e3);
      this.timers.pfm = setInterval(timers.pfm.bind(this), 5e2);
    }

    if (item.name.includes(tower.guardianTitle)) {
      this.towerGuardianId = item.id;
      this.cmd.send(`kill ${item.id}`);
    }

    if (item.name.includes('ord')) {
      clearInterval(this.timers.pfm);
      clearInterval(this.timers.up);
      this.cmd.send(bank.way);
    }
  }
};
