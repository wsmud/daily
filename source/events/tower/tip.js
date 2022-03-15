const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { bank, tower, temple } = yaml.load(
  fs.readFileSync(path.resolve(__dirname, '../../utils/gameInfo.yaml')),
);

module.exports = function (tip) {
  if (tip.includes('说：')) {
    return;
  }

  if (tip.includes('打败我')) {
    this.cmd.send(`kill ${this.towerGuardianId}`);
  }

  if (tip.includes('恭喜你战胜了')) {
    this.combatFailedNum = 0;
  }

  if (tip.includes('灵魂状态')) {
    this.cmd.send('relive');
    clearInterval(this.timers.pfm);
    clearInterval(this.timers.up);
    setTimeout(() => this.cmd.send(tower.way), 6e4);
  }

  if (tip.includes('挑战失败')) {
    clearInterval(this.timers.pfm);
    clearInterval(this.timers.up);
    this.combatFailedNum++;
    if (this.combatFailedNum >= 5) {
      setTimeout(() => {
        this.cmd.send(bank.way);
      }, 1e4);
    } else {
      setTimeout(() => {
        this.cmd.send(temple.way);
      }, 1e4);
    }
  }
};
