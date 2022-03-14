const fs = require('fs');
const yaml = require('js-yaml');
const schedule = require('node-schedule');
const Daily = require('./source/librarys/daily');

function loginQueue(configs, userConfig) {
  const user = new Daily(userConfig);
  user.on('CLOSE', () => {
    if (configs.length > 0) {
      const nextConfig = configs.shift();
      loginQueue(configs, nextConfig);
    }
  });
}

schedule.scheduleJob('5 5 5 * * *', () => {
  const configs = yaml.load(fs.readFileSync('config.yaml'));
  configs.splice(0, 30).forEach((userConfig) => {
    loginQueue(configs, userConfig);
  });
});
