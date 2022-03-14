module.exports = function (data) {
  const taskGood = data.selllist.find((good) => good.name === this.sectTaskInfo.taskItem);
  this.cmd.send(taskGood ? `buy 1 ${taskGood.id} from ${data.seller}` : ``);
  this.cmd.send(this.sect.taskerWay);
};
