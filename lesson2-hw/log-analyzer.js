const minimist = require('minimist');
const fs = require('fs');

// node log-analyzer.js -wrg -s win -u Roman

const argv = minimist(process.argv.slice(2), {
  alias: {
    log: 'l', // --log имя_файла
    file: 'f', // вывести весь файл
    games: 'g', // общее количество партий
    wins: 'w', // количество побед юзера
    rate: 'r', // процент побед
    series: 's', // серия побед -s win|lose
    user: 'u', // фильтр по юзеру
  }
});

const logFile = argv.log ? argv.log : 'log.txt';

fs.readFile(logFile, 'utf8', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    const { user, file, games, wins, rate, series } = argv;
    let data = JSON.parse(res);
    if(file) {
      console.log(data);
    }
    if(user) {
      data = data.filter(game => game.userName === user);
    }
    if(games) {
      console.log(`Сыграно партий: ${data.length}`);
    }
    if(wins) {
      const winsCount = data.filter(game => Boolean(game.user)).length;
      console.log(`Побед: ${winsCount}`);
    }
    if(rate) {
      const winsCount = data.filter(game => Boolean(game.user)).length;
      const rate = (winsCount / data.length * 100).toFixed(0);
      console.log(`Процент побед: ${rate}%`);
    }
    if(series) {
      let totalCount = 0;
      let count = 0;
      data.forEach(game => {
        count = game.result === series ? count+1 : 0;
        if(totalCount < count) totalCount = count;
      });
      console.log(`Серия ${series}: ${totalCount}`);
    }
  }
});