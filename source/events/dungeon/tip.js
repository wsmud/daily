const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { hunt } = yaml.load(fs.readFileSync(path.resolve(__dirname, '../../utils/gameInfo.yaml')));

module.exports = function (tip) {
  if (tip.includes('说：')) {
    return;
  }

  if (tip.includes('精力不够')) {
    this.cmd.send(`taskover signin,taskover zz1,taskover zz2`);
    this.nowTask = 'hunt';
    this.attach(this.huntEvents);
    this.cmd.send(hunt.way);
  }

  if (tip.includes('完成度未满')) {
    this.dungeonNum++;
    if (this.dungeonNum < 20) {
      this.cmd.send(this.dungeon);
    } else {
      this.cmd.send(`taskover signin,taskover zz1,taskover zz2`);
      this.nowTask = 'hunt';
      this.attach(this.huntEvents);
      this.cmd.send(hunt.way);
    }
  }
};
