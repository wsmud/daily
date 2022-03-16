module.exports = function (data) {
  if (!data.name) {
    return;
  }

  this.gameInfo.useLessItems.includes(data.name) && this.cmd.send(`fenjie ${data.id}`);
};
