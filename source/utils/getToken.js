const axios = require('axios');
const { stringify } = require('qs');

module.exports = async function getToken(account, password) {
  const res = await axios.post(
    'http://www.wamud.com/UserAPI/Login',
    stringify({ code: account, pwd: password })
  );

  if (res.status !== 200 || res.data.code !== 1 || !res.headers['set-cookie']) {
    return null;
  }

  const token = res.headers['set-cookie']
    .slice(0, 2)
    .map((cookie) => cookie.match(/^(u|p)=(.+?);/)[2]);
  return decodeURIComponent(token.join(' '));
};
