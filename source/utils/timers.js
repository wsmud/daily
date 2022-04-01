function up() {
  if (
    this.isCombat ||
    this.userStatus.has('busy') ||
    this.userStatus.has('faint') ||
    this.userStatus.has('rash')
  ) {
    return;
  }
  this.cmd.send('go up');
}

function pfm() {
  if (!this.isCombat || this.userStatus.has('busy') || this.userStatus.has('faint') || this.gcd) {
    return;
  }

  const canUseSkill = this.userSkills.find((skill) => !this.cd.has(skill));
  canUseSkill && this.cmd.send(`perform ${canUseSkill}`, false);
}

module.exports = {
  up,
  pfm,
};
