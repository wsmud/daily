const timers = require('../../utils/timers');

module.exports = function (data) {
  this.isCombat = data.start ? true : false;
  if (!this.isCombat) {
    clearInterval(this.timers.pfm);
  } else {
    this.timers.pfm = setInterval(timers.pfm.bind(this), 5e2);
  }
};
