# daily

武神传说日常任务

## 如何使用

```bash
yarn
# npm i
yarn cli
# npm run cli
node .
```

```bash
node . --help

Usage: node . [options]

Options:
  -r, --run         立即运行一次
  -d, --debug       debug模式
  -t --time <cron>  设置定时<cron表达式>
  -h, --help        display help for command
```

## 详细说明

1. 配置[node](http://nodejs.cn/)环境
2. windows的话打开[cmd](https://zhuanlan.zhihu.com/p/370645623)
3. 想[办法](https://www.zhihu.com/question/410243368)进入脚本目录
4. 输入命令`npm i`，等待安装完成
5. 输入命令`npm run cli`完成配置，多账号的话重复此动作
6. 输入`node .`即可每天五点五分五秒定时运行
7. 可搭配[screen](https://www.runoob.com/linux/linux-comm-screen.html)、[tmux](https://github.com/tmux/tmux/wiki/Getting-Started)或[pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)使用。

## Q&A
* Q：如何使用？
* A：看readme
* Q：怎么删除某些角色？
* A：打开`config.yaml`，找到你想删的角色名，从那行删到下一个角色名即可
* Q：怎么立刻做一次日常？
* A：执行命令`node . -r`
* Q：怎么自定义运行时间？
* A：执行命令`node . -t cron表达式`，cron表达式参考https://cron.qqe2.com/
* Q：为什么我执行了`node . -t cron表达式`报错了？
* A：删除脚本即可，脚本太垃圾，不能读取你心中所想的自定义时间
* Q：我还是不会怎么办？
* A：[联系我](https://qm.qq.com/cgi-bin/qm/qr?k=bnXs8-QefzYqDfFVs3I88GbN1BiLx6dk&noverify=0)，付费手把手教学
