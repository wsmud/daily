module.exports = function(data) {
  this.userSkills = Array.from(data.skills, (item) => item.id);
};
