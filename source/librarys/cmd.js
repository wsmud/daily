module.exports = class Cmd {
  #socket;
  #commandList = [];

  constructor(socket) {
    this.#socket = socket;
  }

  send(commandString, wait = true) {
    if (typeof commandString !== 'string') {
      return;
    }

    if (!wait) {
      commandString.split(';').forEach((cmd) => this.#socket.send(cmd));
      return;
    }

    this.#commandList = [...this.#commandList, ...commandString.split(';')];
    this.#commandQueue();
  }

  commandClear() {
    this.#commandList = [];
  }

  commandAgain() {
    this.#commandList = [...this.#commandList, this.lastCommand];
    this.#commandQueue();
  }

  #commandQueue() {
    const nowTime = new Date().getTime();
    if (this.#commandList.length < 1 || this.#socket.readyState !== 1) {
      return;
    }

    if (nowTime - this.lastCommandTime < 5e2) {
      setTimeout(() => this.#commandQueue(), 1e2);
      return;
    }

    this.lastCommand = this.#commandList.shift();
    this.#socket.send(this.lastCommand);
    this.lastCommandTime = nowTime;

    if (this.#commandList.length > 0) {
      setTimeout(() => this.#commandQueue(), 1e2);
    }
  }
};
