module.exports = function (data) {
  this.isCombat = data.start ? true : false;
  if (!this.isCombat) {
    this.cmd.commandClear();
  }
};
