module.exports = function (data) {
  for (const item of data.items) {
    if (item.p || !item.name) {
      continue;
    }

    if (item.name === this.gameInfo.hunt.npc) {
      this.huntTaskerId = item.id;
      this.cmd.send(`ask3 ${item.id}`);
    }
  }
};
