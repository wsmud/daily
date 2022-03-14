module.exports = function (data) {
  if (!this.sect) {
    return;
  }

  for (const item of data.items) {
    if (item.p || !item.name) {
      continue;
    }

    if (item.name === this.sect.tasker) {
      this.sectTaskInfo.taskerId = item.id;
      this.cmd.send(`task sm ${item.id}`);
    }

    if (item.name === this.sectTaskInfo.seller) {
      this.cmd.send(`list ${item.id}`);
    }

    if (item.name.includes(this.sect.chiefTitle)) {
      this.cmd.send(`ask2 ${item.id}`);
      this.nowTask = 'dungeon';
      this.attach(this.dungeonEvents);
      this.cmd.send(this.dungeon);
    }
  }
};
