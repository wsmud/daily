const axios = require('axios');

module.exports = async function getServer(serverNum) {
  const res = await axios.get('http://game.wsmud.com/game/getserver');

  if (res.status !== 200 || !Array.isArray(res.data) || res.data.length < serverNum) {
    return null;
  }

  const serverIndo = res.data[serverNum];
  return `ws://${serverIndo.IP}:${serverIndo.Port}`;
}
