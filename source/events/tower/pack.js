const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { hunt } = yaml.load(fs.readFileSync(path.resolve(__dirname, '../../utils/gameInfo.yaml')));

module.exports = function (data) {
  if (!data.items) {
    return;
  }

  const storeList = data.items.filter((item) => {
    return item && /残页|突破丹/.test(item.name);
  });

  storeList.forEach((item) => this.cmd.send(`store ${item.count} ${item.id}`));
  this.nowTask = 'hunt';
  this.attach(this.huntEvents);
  this.cmd.send(hunt.way);
};
