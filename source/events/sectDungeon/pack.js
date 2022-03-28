module.exports = function (data) {
  if (!data.name) {
    return;
  }

  data.name.includes('玉简') && this.cmd.send(`use ${data.id}`);
};
