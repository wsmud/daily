const axios = require('axios');
const { stringify } = require('qs');

module.exports = async function getToken(account, password) {
  const res = await axios.post(
    'http://game.wsmud.com/userapi/login',
    stringify({ code: account, pwd: password }),
  );

  if (res.status !== 200 || res.data.code !== 1 || !res.headers['set-cookie']) {
    return null;
  }

  const token = res.headers['set-cookie'].map((cookie) => cookie.match(/^(u|p)=(.+?);/)[2]);
  return token.join(' ');
}
