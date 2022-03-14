const fs = require('fs');
const yaml = require('js-yaml');
const chalk = require('chalk');
const prompts = require('prompts');
const getServer = require('./getServer');
const getToken = require('./getToken');
const Socket = require('../librarys/socket');

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

  const config = answers.roles.map(({ id, name }) => {
    return {
      name,
      server: answers.server,
      token: `${answers.password} ${id}`,
    };
  });

  if (fs.existsSync('config.yaml') && fs.statSync('config.yaml').isFile() && answers.add) {
    let lastConfig = yaml.load(fs.readFileSync('config.yaml'));
    !lastConfig && (lastConfig = []);
    fs.writeFileSync('config.yaml', yaml.dump([...lastConfig, ...config]));
  } else {
    fs.writeFileSync('config.yaml', yaml.dump(config));
  }
})();
