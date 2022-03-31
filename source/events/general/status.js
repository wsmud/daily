module.exports = function (data) {
  if (data.id !== this.userId) {
    return;
  }

  switch (data.action) {
    case 'add':
      this.userStatus.add(data.sid);
      break;
    case 'remove':
      this.userStatus.delete(data.sid);
      break;
    case 'clear':
      this.userStatus = new Set();
      break;
    default:
      break;
  }
};
