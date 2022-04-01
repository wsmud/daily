module.exports = function (data) {
  this.isCombat = data.start ? true : false;
  if (this.isCombat) {
    this.userSkills.forEach((skill) => {
      !this.cd.has(skill) && this.cmd.send(`perform ${skill}`, false);
    });
  }
};
