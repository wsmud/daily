module.exports = function (data) {
  this.isCombat = data.start ? true : false;
  clearInterval(this.timers.pfm);
};
