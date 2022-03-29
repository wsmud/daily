const skillPriority = {
  'force.zhen': 0,
  'force.xin': 0,
  'force.cui': 0,
  'dodge.zhui': 1,
  'dodge.chan': 1,
  'blade.shi': 1,
  'sword.wu': 1,
  'dodge.fo': 2,
  'dodge.power': 2,
  'dodge.lingbo': 2,
  'force.ling': 2,
  'force.power': 2,
  'force.wang': 3,
  'sword.yu': 4,
  'parry.yi': 5,
  'unarmed.duo': 5,
  'unarmed.chan': 5,
  'sword.po': 5,
  'sword.chan': 5,
  'force.ding': 5,
  'foece.tu': 6,
  'blade.xue': 6,
  'blade.ref': 6,
  'throwing.luo': 6,
  'swors.ji': 6,
};

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

  const sortSkills = this.userSkills.sort((a, b) => {
    const skillsAPriority = skillPriority[a] ? skillPriority[a] : 999;
    const skillsBPriority = skillPriority[b] ? skillPriority[b] : 999;
    return skillsAPriority - skillsBPriority;
  });


  const canUseSkill = sortSkills.find((skill) => skill !== 'force.tuoli' && !this.cd.has(skill));
  canUseSkill && this.cmd.send(`perform ${canUseSkill}`, false);
}

module.exports = {
  up,
  pfm,
};
