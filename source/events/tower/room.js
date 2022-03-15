const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { bank, tower, temple } = yaml.load(
  fs.readFileSync(path.resolve(__dirname, '../../utils/gameInfo.yaml')),
);

module.exports = function (data) {
  this.isCombat = false;
  this.nowRoomId = data.path;
  switch (data.path) {
    case temple.pathId:
      setTimeout(() => this.cmd.send(tower.way), 6e4);
      break;
    case bank.pathId:
      this.cmd.send('pack');
      break;
    default:
      break;
  }
};
