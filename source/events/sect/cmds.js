module.exports = function (data) {
  const submit = data.items.find((button) => button.name === `上交${this.sectTaskInfo.taskItem}`);
  this.cmd.send(submit ? submit.cmd : `task sm ${this.sectTaskInfo.taskerId} giveup`);
};
