const score = {
    "hig": 1,
    "hic": 2,
    "hiy": 3,
    "hiz": 4,
    "hio": 5
  }
module.exports = function (data) {
  const canNext = data.items.find((button) => button.name.includes('放弃'));
  if (canNext) {
	  let brand = {
      cmd: null,
      score: 99,
    };
    for (const i of data.items) {
      if (!i.name) {
        continue;
      }
      if (i.name == `上交${this.sectTaskInfo.taskItem}`) {
        this.cmd.send(i.cmd);
        return;
      }
      if (i.name.includes('令牌')) {
        let color = i.name.match(/<(.+?)>/)[1];
        if (score[color] < brand.score) {
          brand.cmd = i.cmd;
          brand.score = score[color];
        }
      }
    }
    this.cmd.send(
      brand.cmd ? brand.cmd : `task sm ${this.sectTaskInfo.taskerId} giveup`,
    );
  }
};
