module.exports = function (data) {
  if (data.items) {
    const itemMsg = data.items.filter((msg) => !msg.rec && msg.index);
    itemMsg.forEach((msg) => this.cmd.send(`receive system ${msg.index}`));
  }

  this.cmd.send('score');
};
