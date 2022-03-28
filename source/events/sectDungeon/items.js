module.exports = function (data) {
  for (const item of data.items) {
    if (!item || item.p || !item.name) {
      continue;
    }

    if (item.name === '疯癫的老头') {
      this.cmd.send(`ggdl ${item.id}`);
      this.cmd.send(`${'go north;'.repeat(6)}tiao1 shi;tiao1 shi;tiao2 shi;jumpdown`);
      this.cmd.send('cr gmp/shanmen 0 5');
    }
  }
};
