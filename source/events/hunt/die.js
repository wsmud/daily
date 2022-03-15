module.exports = function (data) {
  if (data.relive) {
    return;
  }

  this.combatFailedNum++;
  this.userStatus = new Set();
  clearInterval(this.timers.pfm);
  this.cmd.send('relive');
};
