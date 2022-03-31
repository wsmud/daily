module.exports = function (data) {
  this.emit(data.dialog, data);
};
