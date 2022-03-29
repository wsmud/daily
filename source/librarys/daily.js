const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Socket = require('./socket');
const gameInfo = yaml.load(fs.readFileSync(path.resolve(__dirname, '../utils/gameInfo.yaml')));

module.exports = class Daily extends Socket {
  constructor(config) {
    super(config);
    this.sect = null;
    this.dungeonNum = 0;
    this.userId = null;
    this.userLevel = null;
    this.gameInfo = gameInfo;
    this.sectTaskInfo = {
      taskerId: null,
      taskItem: null,
      seller: null,
    };
    this.huntTaskInfo = {
      taskFailedNum: 0,
      taskerId: null,
      nowTaskWay: [],
      name: null,
      place: null,
      cai: false,
    };
    this.cd = new Set();
    this.gcd = false;
    this.isCombat = false;
    this.userSkills = null;
    this.userStatus = new Set();
    this.combatFailedNum = 0;
    this.towerGuardianId = null;
    this.nowRoomId = null;
    this.timers = {
      up: null,
      pfm: null,
    };
    this.nowTask = 'sect';
    this.sectEvents = [];
    this.dungeonEvents = [];
    this.towerEvents = [];
    this.huntEvents = [];
    this.sectDungeonEvents = [];
    this.loadEvents();
  }

  loadEvents() {
    this.sectEvents = this.loadEvent('sect');
    this.dungeonEvents = this.loadEvent('dungeon');
    this.towerEvents = this.loadEvent('tower');
    this.huntEvents = this.loadEvent('hunt');
    this.sectDungeonEvents = this.loadEvent('sectDungeon');
    this.attach(this.sectEvents);
  }

  loadEvent(dir) {
    return fs
      .readdirSync(path.resolve(__dirname, `../events/${dir}`))
      .filter((fileName) => fileName.endsWith('.js'))
      .map((fileName) => path.basename(fileName, '.js'));
  }

  attach(events) {
    const [onClose] = this.listeners('CLOSE');
    this.removeAllListeners();
    this.on('ERROR', require('../events/ERROR'));
    onClose && this.on('CLOSE', onClose);
    events.forEach((name) => {
      this.on(name, require(`../events/${this.nowTask}/${name}`));
    });
  }
};
