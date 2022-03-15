module.exports = function (data) {
  if (data.relive) {
    return;
  }

  this.combatFailedNum++;
  clearInterval(this.timers.pfm);
  this.cmd.send('relive');
};
