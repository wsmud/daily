module.exports = function (data) {
  if (data.id && data.distime) {
    this.cd.add(data.id);
    setTimeout(() => this.cd.delete(data.id), data.distime);
  }
  if (data.rtime) {
    this.gcd = true;
    setTimeout(() => (this.gcd = false), data.rtime);
  } else {
    this.gcd = false;
  }
};
