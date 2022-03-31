module.exports = function (data) {
  this.isCombat = data.start ? true : false;
  if (!this.isCombat) {
    clearInterval(this.timers.pfm);
  }
};
