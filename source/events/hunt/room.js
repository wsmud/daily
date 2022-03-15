module.exports = function (data) {
  this.isCombat = false;
  this.nowRoomId = data.path;
  if (data.path === this.gameInfo.temple.pathId) {
    setTimeout(() => {
      if (this.combatFailedNum >= 3) {
        this.combatFailedNum = 0;
        this.cmd.send(this.gameInfo.hunt.way);
      } else {
        this.cmd.send(this.gameInfo.hunt.path[this.huntTaskInfo.place]);
      }
    }, 4e4);
  }
};
