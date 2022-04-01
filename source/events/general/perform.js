const skillPriority = {
  'force.xin': 0,
  'force.cui': 0,
  'dodge.zhui': 1,
  'dodge.chan': 1,
  'blade.shi': 1,
  'sword.wu': 1,
  'sword.yi': 1,
  'dodge.gui': 1,
  'force.zhen': 2,
  'dodge.fo': 2,
  'dodge.power': 2,
  'dodge.lingbo': 2,
  'force.ling': 2,
  'force.power': 2,
  'force.wang': 3,
  'sword.yu': 4,
  'parry.yi': 5,
  'throwing.ding': 5,
  'unarmed.duo': 5,
  'unarmed.chan': 5,
  'sword.po': 5,
  'sword.chan': 5,
  'force.ding': 5,
  'force.tu': 6,
  'blade.xue': 6,
  'blade.ref': 6,
  'throwing.luo': 6,
  'sword.ji': 6,
};

const banSkills = ['force.tuoli', 'unarmed.ref', 'force.jiu', 'force.xi', 'force.hama'];

module.exports = function (data) {
  this.userSkills = Array.from(data.skills, (item) => item.id);
  this.userSkills = this.userSkills.sort((a, b) => {
    const skillsAPriority = skillPriority[a] ? skillPriority[a] : 9;
    const skillsBPriority = skillPriority[b] ? skillPriority[b] : 9;
    return skillsAPriority - skillsBPriority;
  });
  this.userSkills = this.userSkills.filter((skill) => !banSkills.includes(skill));
};
