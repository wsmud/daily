const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { hunt } = yaml.load(fs.readFileSync(path.resolve(__dirname, '../../utils/gameInfo.yaml')));

module.exports = function (data) {
  for (const item of data.items) {
    if (item.p || !item.name) {
      continue;
    }

    if (item.name === hunt.npc) {
      this.huntTaskerId = item.id;
      this.cmd.send(`ask3 ${item.id}`);
    }
  }
};
