const fs = require('fs');
const yaml = require('js-yaml');
const chalk = require('chalk');
const inquirer = require('inquirer');
const getServer = require('./getServer');
const getToken = require('./getToken');
const Socket = require('../librarys/socket');

const dungeons = {
  树林: { id: 'yz/lw/shangu', hard: 0 },
  财主家: { id: 'yz/cuifu/caizhu', hard: 1 },
  流氓巷: { id: 'yz/lmw/xiangzi1', hard: 0 },
  丽春院: { id: 'yz/lcy/dating', hard: 0 },
  兵营: { id: 'yz/by/damen', hard: 0 },
  庄府: { id: 'bj/zhuang/xiaolu', hard: 0 },
  鳌拜府: { id: 'bj/ao/damen', hard: 0 },
  天地会: { id: 'bj/tdh/hct', hard: 0 },
  神龙教: { id: 'bj/shenlong/haitan', hard: 0 },
  关外: { id: 'bj/guanwai/damen', hard: 0 },
  温府: { id: 'cd/wen/damen', hard: 0 },
  五毒教: { id: 'cd/wudu/damen', hard: 0 },
  恒山: { id: 'wuyue/hengshan/daziling', hard: 0 },
  青城山: { id: 'wuyue/qingcheng/shanlu', hard: 0 },
  衡山: { id: 'wuyue/henshan/hengyang', hard: 0 },
  泰山: { id: 'wuyue/taishan/daizong', hard: 0 },
  嵩山: { id: 'wuyue/songshan/taishi', hard: 0 },
  云梦沼泽: { id: 'cd/yunmeng/senlin', hard: 0 },
  桃花岛: { id: 'taohua/haitan', hard: 1 },
  白驼山: { id: 'baituo/damen', hard: 0 },
  星宿海: { id: 'xingxiu/xxh6', hard: 0 },
  冰火岛: { id: 'mj/bhd/haibian', hard: 1 },
  移花宫: { id: 'huashan/yihua/shandao', hard: 1 },
  燕子坞: { id: 'murong/anbian', hard: 1 },
  黑木崖: { id: 'heimuya/shangu', hard: 1 },
  缥缈峰: { id: 'lingjiu/shanjiao', hard: 1 },
  光明顶: { id: 'mj/shanmen', hard: 0 },
  天龙寺: { id: 'tianlong/damen', hard: 1 },
  血刀门: { id: 'xuedao/shankou', hard: 0 },
  古墓派: { id: 'gumu/gumukou', hard: 1 },
  华山论剑: { id: 'huashan/lunjian/leitaixia', hard: 0 },
  侠客岛: { id: 'xkd/shimen', hard: 0 },
  净念禅宗: { id: 'chanzong/shanmen', hard: 1 },
  慈航静斋: { id: 'cihang/shanmen', hard: 1 },
  阴阳谷: { id: 'yyg/ya', hard: 0 },
  战神殿: { id: 'zsd/damen', hard: 1 },
};

(async () => {
  const rolesQuestions = [
    {
      type: 'confirm',
      name: 'add',
      message: '检测到配置文件，是否向原配置文件新增？',
      default: true,
      when() {
        return fs.existsSync('config.yaml') && fs.statSync('config.yaml').isFile();
      },
    },
    {
      type: 'input',
      name: 'pushplus',
      message: 'pushplus的推送token？',
      default: '',
    },
    {
      type: 'list',
      name: 'server',
      message: '服务器？',
      choices: [
        { name: '一区', value: 0 },
        { name: '二区', value: 1 },
        { name: '三区', value: 2 },
        { name: '四区', value: 3 },
        { name: '测试服', value: 4 },
      ],
      async filter(thisAnswer) {
        return await getServer(thisAnswer);
      },
    },
    {
      type: 'input',
      name: 'account',
      message: '账号？',
      validate(thisAnswer) {
        return thisAnswer.length < 1 ? chalk.red('输账号啊！') : true;
      },
    },
    {
      type: 'password',
      name: 'password',
      mask: '*',
      message: '密码？',
      async validate(thisAnswer, answers) {
        if (thisAnswer.length < 1) {
          return chalk.red('输密码啊!');
        }

        const checkPassword = await getToken(answers.account, thisAnswer);
        return !!checkPassword ? true : chalk.red('密码错误！');
      },
    },
    {
      type: 'checkbox',
      name: 'roles',
      message: '角色？',
      async choices(answers) {
        const token = await getToken(answers.account, answers.password);
        return await new Promise((resolve) => {
          const socket = new Socket({
            server: answers.server,
            token,
          });

          socket.on('roles', (data) => {
            socket.socketClose();

            if (data.roles.length < 1) {
              console.log(chalk.red('淦！一个角色都没有做什么日常！'));
              process.exit();
            }

            resolve(
              data.roles.map(({ id, name }) => ({
                name,
                value: {
                  name,
                  server: answers.server,
                  token: `${token} ${id}`,
                },
              })),
            );
          });
        });
      },
      validate(thisAnswer) {
        return thisAnswer.length < 1
          ? chalk.red('不选角色做什么日常！')
          : thisAnswer.length > 10
          ? chalk.red('太多了！')
          : true;
      },
    },
  ];
  const otherQuestions = [];

  const rolesAnswers = await inquirer.prompt(rolesQuestions);

  rolesAnswers.roles.forEach(({ name }) => {
    otherQuestions.push(
      {
        type: 'list',
        name,
        message: `${name}的副本？`,
        choices() {
          return Object.keys(dungeons);
        },
      },
      {
        type: 'list',
        name: `${name}_dungeonDifficulty`,
        message: `${name}的副本难度？`,
        choices: [
          {
            name: '普通',
            value: 0,
          },
          {
            name: '困难',
            value: 1,
          },
        ],
        when(answers) {
          return dungeons[answers[name]].hard;
        },
      },
      {
        type: 'confirm',
        name: `${name}_sectDungeon`,
        message: `${name}是否扫荡古宗门？`,
        default: false,
      },

      {
        type: 'input',
        name: `${name}_loginCommand`,
        message: `${name}登录后执行的命令？`,
      },
      {
        type: 'input',
        name: `${name}_logoutCommand`,
        message: `${name}登出前执行的命令？`,
      },
    );
  });

  const otherAnswers = await inquirer.prompt(otherQuestions);
  const fainlAnswers = {
    pushplus: rolesAnswers.pushplus,
    roles: rolesAnswers.roles.map((role) => {
      return {
        ...role,
        dungeon: `cr ${dungeons[otherAnswers[role.name]].id} ${
          otherAnswers[`${role.name}_dungeonDifficulty`] ? 1 : 0
        }`,
        sectDungeon: otherAnswers[`${role.name}_sectDungeon`],
        loginCommand: otherAnswers[`${role.name}_loginCommand`],
        logoutCommand: otherAnswers[`${role.name}_logoutCommand`],
      };
    }),
  };

  if (fs.existsSync('config.yaml') && fs.statSync('config.yaml').isFile() && rolesAnswers.add) {
    const oldConfig = yaml.load(fs.readFileSync('config.yaml'));
    !oldConfig && (oldConfig = []);
    let oldRoles = Array.isArray(oldConfig) ? oldConfig : oldConfig.roles;
    fainlAnswers.roles.forEach((userRole) => {
      const oldRolesIndex = oldRoles.findIndex(({ name }) => name === userRole.name);
      if (oldRolesIndex >= 0) {
        oldRoles.splice(oldRolesIndex, 1, userRole);
      } else {
        oldRoles.push(userRole);
      }
    });

    fs.writeFileSync(
      'config.yaml',
      yaml.dump({ pushplus: fainlAnswers.pushplus, roles: oldRoles }),
    );
  } else {
    fs.writeFileSync('config.yaml', yaml.dump(fainlAnswers));
  }
})();
