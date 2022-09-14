const fs = require('fs');
const yaml = require('js-yaml');
const { Command } = require('commander');
const schedule = require('node-schedule');
const Daily = require('./source/librarys/daily');
const parser = require('cron-parser');

const program = new Command();

program
  .option('-r, --run', '立即运行一次')
  .option('-d, --debug', 'debug模式')
  .option('-t --time <cron>', '设置定时<cron表达式>');

program.parse(process.argv);
const options = program.opts();
global.debugMode = options.debug ? true : false;

function loginQueue(configs, userConfig) {
  const user = new Daily(userConfig);
  user.on('CLOSE', () => {
    if (configs.length > 0) {
      const nextConfig = configs.shift();
      loginQueue(configs, nextConfig);
    }
  });
}

function run() {
  const configs = yaml.load(fs.readFileSync('config.yaml'));
  const roles = Array.isArray(configs) ? configs : configs.roles;
  global.pushplusToken = configs.pushplus ? configs.pushplus : '';
  roles.splice(0, 30).forEach((userConfig) => {
    loginQueue(configs, userConfig);
  });
}

if (options.run) {
  run();
}
if(options.time){
  try {
    var interval = parser.parseExpression(options.time);
    console.log('下次运行时间:')
    console.log('Date: ', interval.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
    console.log('Date: ', interval.next().toString()); // Sat Dec 29 2012 00:44:00 GMT+0200 (EET)
    console.log('Date: ', interval.next().toString()); // Sat Dec 29 2012 00:44:00 GMT+0200 (EET)
    console.log('Date: ', interval.next().toString()); // Sat Dec 29 2012 00:44:00 GMT+0200 (EET)
    console.log('略...')
  } catch (err) {
    console.log('Error: ' + err.message);
  }
}

schedule.scheduleJob(options.time ? options.time : '5 5 5 * * *', () => {
  run();
});
