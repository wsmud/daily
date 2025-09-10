module.exports = function (data) {
  for (const item of data.items) {
    if (!item || item.p || !item.name) {
      continue;
    }

    if (item.name === '疯癫的老头') {
      this.cmd.send(`ggdl ${item.id};go south`);
      this.cmd.send('cr yzjd/pingyuan 0 2');
    }
  }
};
