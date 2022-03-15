const fs = require('fs');
const yaml = require('js-yaml');
const chalk = require('chalk');
const prompts = require('prompts');
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
  let answers = {};

  await prompts(
    [
      {
        type: () =>
          fs.existsSync('config.yaml') && fs.statSync('config.yaml').isFile() ? 'confirm' : null,
        name: 'add',
        message: '检测到配置文件，是否向原配置文件新增',
        initial: true,
      },
      {
        type: 'select',
        name: 'server',
        message: '服务器？服务器？服务器？',
        choices: [
          { title: '一区', value: 0 },
          { title: '二区', value: 1 },
          { title: '三区', value: 2 },
          { title: '四区', value: 3 },
          { title: '测试服', value: 4 },
        ],
        hint: '上下键移动，空格或回车键选择',
        async format(prev) {
          return await getServer(prev);
        },
      },
      {
        type: 'text',
        name: 'account',
        message: '账号？账号？账号？',
        validate(prev) {
          return prev.length < 1 ? '输账号啊！丢雷楼某！' : true;
        },
      },
      {
        type: 'password',
        name: 'password',
        message: '密码？密码？密码？',
        async validate(prev) {
          if (prev.length < 1) {
            return '输密码啊！丢雷楼某！';
          }

          return (await getToken(answers.account, prev)) ? true : '密码输入错误';
        },
        async format(prev) {
          return await getToken(answers.account, prev);
        },
      },
      {
        type: 'multiselect',
        name: 'roles',
        message: '哪些角色？',
        hint: '上下键移动，空格键选中，A键全选',
        instructions: false,
        async choices() {
          return await new Promise((resolve) => {
            const socket = new Socket({
              server: answers.server,
              token: answers.password,
            });

            socket.on('roles', (data) => {
              socket.socketClose();

              if (data.roles.length < 1) {
                console.log(chalk.red('淦！一个角色都没有做什么日常！'));
                process.exit();
              }

              resolve(
                data.roles.map(({ id, name }) => ({
                  value: { id, name },
                  title: name,
                })),
              );
            });
          });
        },
      },
    ],
    {
      onSubmit(prpmpt, answer, answersSoFar) {
        answers = { ...answers, ...answersSoFar };
      },
      onCancel: () => process.exit(),
    },
  );

  let config = answers.roles.map(({ id, name }) => {
    return {
      name,
      server: answers.server,
      token: `${answers.password} ${id}`,
    };
  });

  const dungeonQuestions = [];

  config.forEach((user) => {
    const dungeonQuestion = {
      type: 'select',
      name: user.name,
      message: `${user.name}的副本？`,
      choices() {
        const selects = [];
        for (const dungeonName in dungeons) {
          selects.push({
            title: dungeonName,
            value: dungeonName,
          });
        }
        return selects;
      },
    };
    const difficultyQuestion = {
      type: (prev) => (dungeons[prev].hard ? 'select' : null),
      name: `${user.name}hard`,
      message: `${user.name}的副本难度？`,
      choices: [
        {
          title: '普通',
          value: 0,
        },
        {
          title: '困难',
          value: 1,
        },
      ],
    };
    dungeonQuestions.push(dungeonQuestion, difficultyQuestion);
  });

  const dungeonAnswers = await prompts(dungeonQuestions);

  config = config.map((user) => {
    const newUserConfig = {
      ...user,
      dungeon: `cr ${dungeons[dungeonAnswers[user.name]].id} ${
        dungeonAnswers[`${user.name}hard`] ? 1 : 0
      }`,
    };

    return newUserConfig;
  });

  if (fs.existsSync('config.yaml') && fs.statSync('config.yaml').isFile() && answers.add) {
    let lastConfig = yaml.load(fs.readFileSync('config.yaml'));
    !lastConfig && (lastConfig = []);
    config.forEach((userConfig) => {
      const oldConfigIndex = lastConfig.findIndex(({ name }) => name === userConfig.name);
      if (oldConfigIndex >= 0) {
        lastConfig.splice(oldConfigIndex, 1, userConfig);
      } else {
        lastConfig.push(userConfig);
      }
    });
    fs.writeFileSync('config.yaml', yaml.dump(lastConfig));
  } else {
    fs.writeFileSync('config.yaml', yaml.dump(config));
  }
})();
