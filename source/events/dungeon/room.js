module.exports = function (data) {
  if (data.name.includes('副本区域')) {
    this.cmd.send('cr over');
  }
};
