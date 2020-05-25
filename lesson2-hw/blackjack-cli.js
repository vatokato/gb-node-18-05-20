const Blackjack = require('./Blackjack');
const readLine = require('readline');
const minimist = require('minimist');
const fs = require('fs');

const argv = minimist(process.argv.slice(2), {
    alias: {
      log: 'l', // --log имя_файла
      user: 'u', // имя юзера
    }
});

const logFile = argv.log ? argv.log : 'log.txt';
const userName = argv.user ? argv.user : 'noname';

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const blackjack = new Blackjack({
  afterUserTurn: (userScore, card) => {
    console.log(`Вы вытянули ${card.fullName}. Текущий счет: ${userScore}`);
    console.log(`1 - Еще, 2 - Хватит, 3 - Счет, 0 - Выход`);
  },
  afterEndGame: () => {
    console.log(`Хотите еще раз сыграть в блэкджек? (1 - Да, 0 - Нет)`);
  },
  afterStartGame: () => {
    console.log(`Тяните карту (1 - Еще, 2 - Хватит, 0 - Выход)`);
  },
  onWin: (userScore, aiScore) => {
    console.log(`-----------------------------------------------`);
    console.log(`Вы выйграли, набрав ${userScore}. У компьютера ${aiScore}`);
    console.log(`***********************************************`);
    saveLog({
      result: 'win',
      user: 1,
      ai: 0,
      timestamp: new Date().getTime(),
      userName,
    });
  },
  onLose: (userScore, aiScore) => {
    console.log(`-----------------------------------------------`);
    console.log(`Вы проиграли, набрав ${userScore}. У компьютера ${aiScore}`);
    console.log(`***********************************************`);
    saveLog({
      result: 'lose',
      user: 0,
      ai: 1,
      timestamp: new Date().getTime(),
      userName
    });
  },
  onDraw: (userScore, aiScore) => {
    console.log(`-----------------------------------------------`);
    console.log(`Ничья, вы набрали ${userScore}. У компьютера ${aiScore}`);
    console.log(`***********************************************`);
    saveLog({
      result: 'draw',
      user: 0,
      ai: 0,
      timestamp: new Date().getTime(),
      userName
    });
  },
});

startGame();

function startGame () {
  console.log('Хотите сыграть в блэкджек? (1 - Да, 0 - Нет)');

  rl.on('line', (line) => {
    if(!blackjack.isGaming() && line === '1') {
      console.clear();
      blackjack.newGame();
    } else if (!blackjack.isGaming() && line === '0') {
      rl.close();
    } else if (line === '1') {
      blackjack.userTurn();
    } else if (line === '2') {
      blackjack.userStop();
    } else if (line === '3') {
      console.log(`Ваш счет: ${blackjack.getUserScore()}`);
    } else if (line === 'exit' || line === '0') {
      rl.close();
    } else {
      console.log('Ошибка ввода.');
    }
  });
}

function saveLog (result) {
  fs.readFile(logFile, 'utf8', (err, res) => {
    const data = (res && JSON.parse(res)) || [];
    data.push(result);
    fs.writeFile(logFile, JSON.stringify(data), (err) => {
      if (err) throw err;
    });
  });
}


