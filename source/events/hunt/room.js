module.exports = function (data) {
  this.isCombat = false;
  this.nowRoomId = data.path;
  if (data.path === this.gameInfo.temple.pathId) {
    setTimeout(() => {
      if (this.combatFailedNum >= 3) {
        this.huntTaskInfo.place = null;
        this.huntTaskInfo.nowTaskWay = [];
        this.combatFailedNum = 0;
        this.cmd.send(this.gameInfo.hunt.way);
      } else {
        this.huntTaskInfo.nowTaskWay = JSON.parse(
          JSON.stringify(this.gameInfo.hunt.path[this.huntTaskInfo.place].split(';')),
        );
        this.cmd.send(this.huntTaskInfo.nowTaskWay.shift());
      }
    }, 4e4);
  }
};
