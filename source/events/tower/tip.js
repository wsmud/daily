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
    clearInterval(this.timers.up);
    setTimeout(() => this.cmd.send(this.gameInfo.tower.way), 6e4);
  }

  if (tip.includes('只能在战斗中使用')) {
    this.isCombat = false;
    clearInterval(this.timers.pfm);
  }

  if (tip.includes('挑战失败')) {
    clearInterval(this.timers.up);
    this.combatFailedNum++;
    if (this.combatFailedNum >= 3) {
      this.combatFailedNum = 0;
      setTimeout(() => {
        this.cmd.send(this.gameInfo.bank.way);
      }, 1e4);
    } else {
      setTimeout(() => {
        this.cmd.send(this.gameInfo.temple.way);
      }, 1e4);
    }
  }
};
