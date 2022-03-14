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
  }
};
