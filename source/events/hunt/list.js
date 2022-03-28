module.exports = function (data) {
  if (!data.selllist) {
    return;
  }

  const pickax = data.selllist.find((good) => good.name === '<wht>铁镐</wht>');
  this.cmd.send(pickax ? `buy 1 ${pickax.id} from ${data.seller}` : '');
  this.cmd.send(this.userConfig.logoutCommand);
  this.cmd.send(
    /ord|hio/.test(this.userLevel)
      ? 'jh fam 0 start;go west;go west;go north;go enter;go west;xiulian'
      : 'wakuang',
  );
};
