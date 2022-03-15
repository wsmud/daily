module.exports = function (data) {
  if (data.relive) {
    return;
  }

  clearInterval(this.timers.pfm);
  clearInterval(this.timers.up);
  this.userStatus = new Set();
  this.combatFailedNum++;
  this.cmd.send('relive');
};
